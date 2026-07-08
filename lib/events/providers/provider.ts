import { BostonEvent } from '../types';

export interface EventSearchQuery {
  category?: string;
  keywords?: string;
  dateStart?: string;
  dateEnd?: string;
  priceMax?: number;
}

export interface EventProvider {
  name: string;
  search(query: EventSearchQuery): Promise<BostonEvent[]>;
}
