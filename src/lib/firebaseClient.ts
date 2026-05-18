"use client";

import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {
  Firestore,
  doc,
  getDoc,
  getFirestore
} from "firebase/firestore";

export type AccountProfile = {
  uid: string;
  email: string | null;
  isPro: boolean;
  gumroadLicenseKey?: string;
  gumroadProductName?: string;
  gumroadEmail?: string | null;
  updatedAt?: unknown;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp | null = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;

function requireAuth() {
  if (!auth || !db) {
    throw new Error("Firebase is not configured.");
  }

  return { auth, db };
}

export async function signInWithGoogle() {
  const { auth } = requireAuth();
  const credential = await signInWithPopup(auth, new GoogleAuthProvider());
  await ensureUserProfile(credential.user);
  return credential.user;
}

export async function signInWithEmail(email: string, password: string) {
  const { auth } = requireAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserProfile(credential.user);
  return credential.user;
}

export async function createAccountWithEmail(email: string, password: string) {
  const { auth } = requireAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await ensureUserProfile(credential.user);
  return credential.user;
}

export async function signOutUser() {
  const { auth } = requireAuth();
  await signOut(auth);
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

export async function ensureUserProfile(user: User) {
  const token = await user.getIdToken();
  const response = await fetch("/api/account/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error || "Unable to create account profile.");
  }
}

export async function readAccountProfile(uid: string): Promise<AccountProfile | null> {
  const { db } = requireAuth();
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    uid,
    email: typeof data.email === "string" ? data.email : null,
    isPro: Boolean(data.isPro),
    gumroadLicenseKey: typeof data.gumroadLicenseKey === "string" ? data.gumroadLicenseKey : undefined,
    gumroadProductName: typeof data.gumroadProductName === "string" ? data.gumroadProductName : undefined,
    gumroadEmail: typeof data.gumroadEmail === "string" ? data.gumroadEmail : null,
    updatedAt: data.updatedAt
  };
}
