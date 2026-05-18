import { stripePaymentLink } from "@/lib/stripeClient";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-4 leading-8 text-slate-300">
        Connect Supabase and Stripe environment variables to enable real account sessions and paid premium downloads.
        The free generator works fully in the browser without authentication.
      </p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <h2 className="text-xl font-semibold">Account Status</h2>
        <p className="mt-3 text-slate-400">Demo mode: free templates are available. Premium templates require configured Supabase and Stripe sessions.</p>
        <a
          href={stripePaymentLink || "/"}
          className="mt-5 inline-flex rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black hover:bg-emerald-300"
        >
          Manage or Unlock Pro
        </a>
      </div>
    </main>
  );
}
