export interface BostonEvent {
  id: string; // unique, e.g., 'tm-123' or 'seed-456'
  title: string;
  description?: string;
  category: string; // museum, sports, concert, market, outdoor, promotion, science, restaurant, lifestyle, wellness
  venue: string;
  location?: string; // address
  startDate: string; // ISO date or localized string
  endDate?: string;
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  url: string; // outbound link
  imageUrl?: string;
  sourceProvider: 'ticketmaster' | 'seed';
}
