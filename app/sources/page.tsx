import { CURATED_SOURCES } from '@/data/sources';
import { EVENT_CATEGORIES } from '@/lib/events/categories';
import { CategorySection } from '@/components/sources/CategorySection';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Trusted Local Sources — Boston AI Concierge',
  description: 'Our human-curated directory of trusted Boston venues, organizations, parks, and sites.',
};

export default function SourcesPage() {
  return (
    <main className="flex-1 w-full bg-zinc-50/30 dark:bg-zinc-950/20 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 mx-auto sm:mx-0 shadow-xs">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-outfit">
              Trusted Local Sources
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              This directory serves as the human-curated context engine for the Boston AI Concierge. We compile outbound links to primary sources across museums, markets, local recreation, and dining, keeping recommendations high quality and direct to the source.
            </p>
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-10">
          {EVENT_CATEGORIES.map((category) => {
            const sources = CURATED_SOURCES[category] || [];
            return (
              <CategorySection
                key={category}
                category={category}
                sources={sources}
              />
            );
          })}
        </div>

        {/* Footer info */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
            Know a venue or local guide that should be featured here? Let us know. These listings are maintained directly in the source repository under <code className="bg-zinc-100 dark:bg-zinc-850 px-1 py-0.5 rounded text-zinc-700 dark:text-zinc-300 font-mono text-[10px]">data/sources.ts</code>.
          </p>
        </div>

      </div>
    </main>
  );
}
