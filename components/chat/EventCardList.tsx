import { BostonEvent } from '@/lib/events/types';
import { EventCard } from './EventCard';

interface EventCardListProps {
  events: BostonEvent[];
}

export function EventCardList({ events }: EventCardListProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="mt-4 w-full animate-fade-in">
      <div className="mb-2.5 flex items-center gap-2">
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Concierge Recommendations ({events.length})
        </span>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
