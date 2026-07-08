import Link from 'next/link';
import { Compass, Info } from 'lucide-react';

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Boston AI Concierge
            </span>
            <span className="ml-1.5 hidden rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 sm:inline-block">
              MVP
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/sources"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-xs transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 dark:hover:text-zinc-50"
          >
            <Info className="h-4 w-4 text-zinc-500" />
            <span>Trusted Sources</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
