import { EventProvider, EventSearchQuery } from './provider';
import { BostonEvent } from '../types';

interface TicketmasterImage {
  ratio?: string;
  width?: number;
  url: string;
}

interface TicketmasterRawEvent {
  id: string;
  name: string;
  info?: string;
  description?: string;
  url: string;
  images?: TicketmasterImage[];
  dates?: {
    start?: {
      dateTime?: string;
      localDate?: string;
    };
  };
  priceRanges?: Array<{
    min?: number;
    max?: number;
    currency?: string;
  }>;
  classifications?: Array<{
    segment?: {
      name?: string;
    };
  }>;
  _embedded?: {
    venues?: Array<{
      name?: string;
      address?: {
        line1?: string;
      };
      city?: {
        name?: string;
      };
    }>;
  };
}

export class TicketmasterEventProvider implements EventProvider {
  name = 'ticketmaster';

  async search(query: EventSearchQuery): Promise<BostonEvent[]> {
    const apiKey = process.env.TICKETMASTER_API_KEY;

    if (!apiKey) {
      console.warn('Ticketmaster API key is missing. Skipping Ticketmaster queries.');
      return [];
    }

    // Ticketmaster primarily covers sports, music/concerts, and arts/theatre.
    if (query.category) {
      const cat = query.category.toLowerCase();
      const coveredCategories = ['sports', 'concert', 'lifestyle'];
      if (!coveredCategories.includes(cat)) {
        return [];
      }
    }

    try {
      const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
      url.searchParams.set('apikey', apiKey);
      url.searchParams.set('city', 'Boston');
      url.searchParams.set('stateCode', 'MA');
      url.searchParams.set('size', '20');

      if (query.category) {
        const cat = query.category.toLowerCase();
        if (cat === 'concert') {
          url.searchParams.set('classificationName', 'music');
        } else if (cat === 'sports') {
          url.searchParams.set('classificationName', 'sports');
        } else if (cat === 'lifestyle') {
          url.searchParams.set('classificationName', 'arts');
        }
      }

      if (query.keywords) {
        url.searchParams.set('keyword', query.keywords);
      }

      if (query.dateStart) {
        const startIso = new Date(query.dateStart).toISOString().split('.')[0] + 'Z';
        url.searchParams.set('startDateTime', startIso);
      }
      if (query.dateEnd) {
        const endIso = new Date(query.dateEnd).toISOString().split('.')[0] + 'Z';
        url.searchParams.set('endDateTime', endIso);
      }

      const res = await fetch(url.toString(), {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!res.ok) {
        console.error(`Ticketmaster API returned status ${res.status}`);
        return [];
      }

      const data = await res.json();
      const rawEvents: TicketmasterRawEvent[] = data._embedded?.events || [];

      return rawEvents.map((item: TicketmasterRawEvent): BostonEvent => {
        const venueInfo = item._embedded?.venues?.[0];
        const venueName = venueInfo?.name || 'Venue TBA';
        const venueAddress = venueInfo?.address?.line1 
          ? `${venueInfo.address.line1}, ${venueInfo.city?.name || 'Boston'}`
          : venueInfo?.city?.name || 'Boston, MA';

        const priceRange = item.priceRanges?.[0];
        const img = item.images?.find((i: TicketmasterImage) => i.ratio === '16_9' && (i.width || 0) > 500) || item.images?.[0];

        let inferredCategory = 'concert';
        const segment = item.classifications?.[0]?.segment?.name?.toLowerCase();
        if (segment === 'sports') {
          inferredCategory = 'sports';
        } else if (segment === 'arts & theatre') {
          inferredCategory = 'lifestyle';
        }

        return {
          id: `tm-${item.id}`,
          title: item.name,
          description: item.info || item.description || undefined,
          category: inferredCategory,
          venue: venueName,
          location: venueAddress,
          startDate: item.dates?.start?.dateTime || item.dates?.start?.localDate || new Date().toISOString(),
          priceMin: priceRange?.min,
          priceMax: priceRange?.max,
          currency: priceRange?.currency || 'USD',
          url: item.url,
          imageUrl: img?.url || undefined,
          sourceProvider: 'ticketmaster',
        };
      });
    } catch (error) {
      console.error('Error fetching from Ticketmaster:', error);
      return [];
    }
  }
}
