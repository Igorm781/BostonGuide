import { CuratedSource } from '@/data/sources';
import { ExternalLink, MapPin } from 'lucide-react';

interface SourceCardProps {
  source: CuratedSource;
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <div className="group flex flex-col justify-between p-5 rounded-xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
            {source.name}
          </h3>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer shrink-0"
            title={`Visit ${source.name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
          {source.description}
        </p>
      </div>

      {source.neighborhood && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{source.neighborhood}</span>
        </div>
      )}
    </div>
  );
}
