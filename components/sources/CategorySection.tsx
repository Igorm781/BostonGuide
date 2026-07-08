import { CuratedSource } from '@/data/sources';
import { EventCategory, CATEGORY_THEMES } from '@/lib/events/categories';
import { SourceCard } from './SourceCard';
import { Badge } from '../ui/Badge';

interface CategorySectionProps {
  category: EventCategory;
  sources: CuratedSource[];
}

export function CategorySection({ category, sources }: CategorySectionProps) {
  const theme = CATEGORY_THEMES[category] || {
    label: category,
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeText: 'text-zinc-700 dark:text-zinc-300',
    badgeBorder: 'border-zinc-200 dark:border-zinc-750',
    dotBg: 'bg-zinc-500',
  };

  if (!sources || sources.length === 0) return null;

  return (
    <section className="space-y-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/40 last:border-b-0">
      <div className="flex items-center gap-3">
        <Badge className={`${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} text-xs font-semibold py-1 px-3`}>
          <span className={`h-2 w-2 rounded-full ${theme.dotBg}`} />
          {theme.label}
        </Badge>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
          {sources.length} curated {sources.length === 1 ? 'source' : 'sources'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sources.map((source, idx) => (
          <SourceCard key={idx} source={source} />
        ))}
      </div>
    </section>
  );
}
