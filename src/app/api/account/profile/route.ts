import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : "";

  if (!token) {
    return NextResponse.json({ error: "Missing Firebase ID token." }, { status: 401 });
  }

  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const profileRef = getAdminDb().collection("users").doc(decodedToken.uid);
    const snapshot = await profileRef.get();

    if (!snapshot.exists) {
      await profileRef.set({
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        isPro: false,
        updatedAt: FieldValue.serverTimestamp()
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create account profile.";
    const status = message.includes("Firebase Admin") ? 503 : 401;
    return NextResponse.json({ error: message }, { status });
  }
}
