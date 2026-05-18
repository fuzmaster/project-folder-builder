export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-4 leading-8 text-slate-300">
        Firebase handles accounts, Firestore stores Pro status, and Gumroad handles payment and license keys.
        The free generator still works fully in the browser without authentication.
      </p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <h2 className="text-xl font-semibold">Pro Unlock Flow</h2>
        <p className="mt-3 leading-7 text-slate-400">
          Users buy Pro on Gumroad, sign in with Firebase, paste their Gumroad license key, and the server verifies both the Firebase ID token and the Gumroad license.
          After verification, Firebase Admin writes <code className="rounded bg-black/30 px-1.5 py-0.5">users/{"{uid}"}.isPro</code> in Firestore so premium template downloads unlock.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL || "/"}
          className="mt-5 inline-flex rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black hover:bg-emerald-300"
        >
          Buy Pro on Gumroad
        </a>
      </div>
    </main>
  );
}
