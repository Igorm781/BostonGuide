import { EventProvider, EventSearchQuery } from './provider';
import { BostonEvent } from '../types';
import { getSeedEvents } from '../../../data/seed-events';

export class SeedEventProvider implements EventProvider {
  name = 'seed';

  async search(query: EventSearchQuery): Promise<BostonEvent[]> {
    const events = getSeedEvents();

    return events.filter((event) => {
      // 1. Category check
      if (
        query.category &&
        event.category.toLowerCase() !== query.category.toLowerCase()
      ) {
        return false;
      }

      // 2. Keywords check (in title, description, or venue)
      if (query.keywords) {
        const kw = query.keywords.toLowerCase();
        const titleMatch = event.title.toLowerCase().includes(kw);
        const descMatch = event.description?.toLowerCase().includes(kw);
        const venueMatch = event.venue.toLowerCase().includes(kw);
        if (!titleMatch && !descMatch && !venueMatch) {
          return false;
        }
      }

      // 3. Price check
      if (query.priceMax !== undefined) {
        const eventPrice = event.priceMin ?? 0;
        if (eventPrice > query.priceMax) {
          return false;
        }
      }

      // 4. Date check
      const eventTime = new Date(event.startDate).getTime();
      if (query.dateStart) {
        const startTime = new Date(query.dateStart).getTime();
        if (eventTime < startTime) {
          return false;
        }
      }
      if (query.dateEnd) {
        const endTime = new Date(query.dateEnd).getTime();
        if (eventTime > endTime) {
          return false;
        }
      }

      return true;
    });
  }
}
