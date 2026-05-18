import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

type GumroadVerifyResponse = {
  success?: boolean;
  message?: string;
  purchase?: {
    product_name?: string;
    email?: string;
    refunded?: boolean;
    disputed?: boolean;
    chargebacked?: boolean;
    subscription_cancelled_at?: string | null;
    subscription_failed_at?: string | null;
  };
};

function purchaseIsBlocked(purchase: GumroadVerifyResponse["purchase"]) {
  return Boolean(
    purchase?.refunded ||
      purchase?.disputed ||
      purchase?.chargebacked ||
      purchase?.subscription_cancelled_at ||
      purchase?.subscription_failed_at
  );
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : "";

  if (!token) {
    return NextResponse.json({ error: "Missing Firebase ID token." }, { status: 401 });
  }

  let body: { licenseKey?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const licenseKey = body.licenseKey?.trim();
  if (!licenseKey) {
    return NextResponse.json({ error: "Enter a Gumroad license key." }, { status: 400 });
  }

  const productId = process.env.GUMROAD_PRODUCT_ID;
  const productPermalink = process.env.GUMROAD_PRODUCT_PERMALINK;

  if (!productId && !productPermalink) {
    return NextResponse.json({ error: "Gumroad product configuration is missing." }, { status: 503 });
  }

  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const form = new URLSearchParams({
      license_key: licenseKey,
      increment_uses_count: "false"
    });

    if (productId) {
      form.set("product_id", productId);
    } else if (productPermalink) {
      form.set("product_permalink", productPermalink);
    }

    const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Gumroad license verification failed." }, { status: 502 });
    }

    const result = (await response.json()) as GumroadVerifyResponse;

    if (!result.success || !result.purchase) {
      return NextResponse.json(
        { error: result.message || "Gumroad license verification failed." },
        { status: 403 }
      );
    }

    if (purchaseIsBlocked(result.purchase)) {
      return NextResponse.json({ error: "This Gumroad purchase is not eligible for Pro access." }, { status: 403 });
    }

    const productName = result.purchase.product_name || "Project Folder Builder Pro";
    const gumroadEmail = result.purchase.email || null;

    await getAdminDb().collection("users").doc(decodedToken.uid).set(
      {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        isPro: true,
        gumroadLicenseKey: licenseKey,
        gumroadProductName: productName,
        gumroadEmail,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, isPro: true, productName });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify Gumroad license.";
    const status = message.includes("Firebase Admin") ? 503 : 401;
    return NextResponse.json({ error: message }, { status });
  }
}
