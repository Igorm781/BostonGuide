import { BostonEvent } from './types';
import { EventSearchQuery } from './providers/provider';
import { SeedEventProvider } from './providers/seed';
import { TicketmasterEventProvider } from './providers/ticketmaster';
import { eventCache } from './cache';

const providers = [
  new SeedEventProvider(),
  new TicketmasterEventProvider(),
];

export async function searchEvents(query: EventSearchQuery): Promise<BostonEvent[]> {
  // 1. Check cache first
  const cached = eventCache.get(query);
  if (cached) {
    console.log('Event search returned cached results for query:', JSON.stringify(query));
    return cached;
  }

  console.log('Querying event providers for:', JSON.stringify(query));

  // 2. Fetch from all providers concurrently using Promise.allSettled
  const searchPromises = providers.map((provider) =>
    provider.search(query).catch((err) => {
      console.error(`Provider "${provider.name}" failed:`, err);
      return [] as BostonEvent[];
    })
  );

  const results = await Promise.allSettled(searchPromises);

  const allEvents: BostonEvent[] = [];
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      allEvents.push(...result.value);
    }
  });

  // 3. Deduplicate events (e.g. if an event is in seed and Ticketmaster, match by title or ID)
  const seenIds = new Set<string>();
  const uniqueEvents = allEvents.filter((event) => {
    if (seenIds.has(event.id)) return false;
    seenIds.add(event.id);
    return true;
  });

  // 4. Sort by date (closest events first)
  uniqueEvents.sort((a, b) => {
    const timeA = new Date(a.startDate).getTime();
    const timeB = new Date(b.startDate).getTime();
    return timeA - timeB;
  });

  // 5. Cap results at 8 items
  const finalEvents = uniqueEvents.slice(0, 8);

  // 6. Save in cache
  eventCache.set(query, finalEvents);

  return finalEvents;
}
