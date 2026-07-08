import { BostonEvent } from '@/lib/events/types';
import { CATEGORY_THEMES, EventCategory } from '@/lib/events/categories';
import { Calendar, MapPin, ExternalLink, Ticket } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface EventCardProps {
  event: BostonEvent;
}

export function EventCard({ event }: EventCardProps) {
  const cat = event.category as EventCategory;
  const theme = CATEGORY_THEMES[cat] || {
    label: event.category,
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeText: 'text-zinc-700 dark:text-zinc-300',
    badgeBorder: 'border-zinc-200 dark:border-zinc-750',
    dotBg: 'bg-zinc-500',
  };

  // Format date nicely (e.g., "Fri, Jul 10 • 7:00 PM")
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const dateStr = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const timeStr = d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      return `${dateStr} • ${timeStr}`;
    } catch {
      return isoString;
    }
  };

  // Format price output
  const formatPrice = () => {
    const min = event.priceMin;
    const max = event.priceMax;

    if (min === undefined && max === undefined) {
      return 'Price TBA';
    }
    if (min === 0 && max === 0) {
      return 'Free';
    }
    if (min !== undefined && max !== undefined && min !== max) {
      return `$${min} - $${max}`;
    }
    return `$${min ?? max}`;
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
      {/* Event Image or Geometric Fallback */}
      <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 relative">
            <div className={`absolute inset-0 opacity-10 ${theme.dotBg}`} />
            <Ticket className="h-10 w-10 text-zinc-300 dark:text-zinc-700" />
          </div>
        )}
        
        {/* Category Badge overlayed top-left */}
        <div className="absolute top-2.5 left-2.5">
          <Badge className={`${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} backdrop-blur-xs shadow-xs`}>
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dotBg}`} />
            {theme.label}
          </Badge>
        </div>

        {/* Source Provider badge overlayed top-right */}
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-white/80 dark:bg-black/60 text-[9px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 border-none backdrop-blur-xs font-semibold">
            {event.sourceProvider}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
          {event.title}
        </h3>
        
        {event.description && (
          <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
            {event.description}
          </p>
        )}

        <div className="mt-auto pt-3 space-y-1.5 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span className="truncate">{formatDate(event.startDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <MapPin className="h-3.5 w-3.5 text-zinc-400" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>

      {/* Footer Outbound Action */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/30">
        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
          {formatPrice()}
        </span>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-250 cursor-pointer"
        >
          <span>View source</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
