import Link from "next/link";
import { FolderKanban } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-black">
            <FolderKanban size={20} />
          </span>
          <span>Project Folder Builder</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </nav>
      </div>
    </header>
  );
}
