import { BostonEvent } from '../lib/events/types';

// Helper to calculate relative ISO dates dynamically so search queries like "this weekend" always succeed
const getRelativeDate = (daysAhead: number, hours: number = 12): string => {
  // Use a fixed baseline to avoid local/UTC timezone drift issues
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hours, 0, 0, 0);
  return d.toISOString();
};

export const getSeedEvents = (): BostonEvent[] => [
  {
    id: 'seed-museum-1',
    title: 'MFA Twilight Gallery Tour',
    description: 'Explore the Museum of Fine Arts under ambient evening lighting. Includes a curated highlights tour of the American Wing and a complimentary beverage.',
    category: 'museum',
    venue: 'Museum of Fine Arts, Boston',
    location: '465 Huntington Ave, Boston, MA 02115',
    startDate: getRelativeDate(2, 18), // 2 days ahead, e.g. Thursday evening
    priceMin: 25,
    priceMax: 35,
    currency: 'USD',
    url: 'https://www.mfa.org',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-museum-2',
    title: 'ICA Summer Rooftop DJ Sessions',
    description: 'Dance on the waterfront with Boston\'s top DJs. Access to all galleries, outdoor cash bar, and breathtaking harbor views included.',
    category: 'museum',
    venue: 'Institute of Contemporary Art',
    location: '25 Harbor Shore Dr, Boston, MA 02210',
    startDate: getRelativeDate(3, 19), // 3 days ahead, e.g. Friday night
    priceMin: 20,
    priceMax: 20,
    currency: 'USD',
    url: 'https://www.icaboston.org',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-market-1',
    title: 'SoWa Open Market',
    description: 'Boston\'s biggest celebration of local artisans, food trucks, farmers, and brewers. Explore three blocks of local craftsmanship.',
    category: 'market',
    venue: 'SoWa Art + Design District',
    location: '530 Harrison Ave, Boston, MA 02118',
    startDate: getRelativeDate(5, 10), // 5 days ahead, Sunday morning
    priceMin: 0,
    priceMax: 0,
    currency: 'USD',
    url: 'https://www.sowaboston.com',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-market-2',
    title: 'Boston Public Market Culinary Demo',
    description: 'Learn to prepare classic New England clam chowder from scratch with a professional chef. Samples and recipe cards provided.',
    category: 'market',
    venue: 'Boston Public Market',
    location: '100 Hanover St, Boston, MA 02108',
    startDate: getRelativeDate(1, 14), // 1 day ahead, e.g. Wednesday afternoon
    priceMin: 15,
    priceMax: 15,
    currency: 'USD',
    url: 'https://bostonpublicmarket.org',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-science-1',
    title: 'Gilliland Observatory Stargazing',
    description: 'Peer through the Museum of Science\'s high-powered telescopes. Guided stargazing session with local astronomers, weather permitting.',
    category: 'science',
    venue: 'Museum of Science, Boston',
    location: '1 Science Park, Boston, MA 02114',
    startDate: getRelativeDate(3, 20), // 3 days ahead, Friday night
    priceMin: 0,
    priceMax: 0,
    currency: 'USD',
    url: 'https://www.mos.org',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-wellness-1',
    title: 'November Project: Stadium Stairs',
    description: 'Join the legendary free fitness movement at Harvard Stadium. Run the sections, push your limits, and join a vibrant local community.',
    category: 'wellness',
    venue: 'Harvard Stadium',
    location: '65 N Harvard St, Boston, MA 02163',
    startDate: getRelativeDate(1, 6), // 1 day ahead, 6:30 AM
    priceMin: 0,
    priceMax: 0,
    currency: 'USD',
    url: 'https://november-project.com/boston/',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-wellness-2',
    title: 'Yoga on the Boston Common',
    description: 'Start your weekend with a rejuvenating Vinyasa flow under the trees. Bring your own mat; all skill levels welcome.',
    category: 'wellness',
    venue: 'Boston Common (near Soldiers Monument)',
    location: '139 Tremont St, Boston, MA 02111',
    startDate: getRelativeDate(4, 9), // 4 days ahead, Saturday morning
    priceMin: 0,
    priceMax: 0,
    currency: 'USD',
    url: 'https://www.boston.gov/parks/boston-common',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-outdoor-1',
    title: 'Charles River Sunset Kayaking',
    description: 'Watch the Boston skyline light up from the water. Rental includes high-quality single/double kayak, paddle, and safety vest.',
    category: 'outdoor',
    venue: 'Paddle Boston - Kendall Square',
    location: '15 Broad Canal Way, Cambridge, MA 02142',
    startDate: getRelativeDate(2, 17), // 2 days ahead, late afternoon
    priceMin: 30,
    priceMax: 50,
    currency: 'USD',
    url: 'https://paddleboston.com',
    imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-restaurant-1',
    title: 'Greenway Food Truck Festival',
    description: 'Taste the best of Boston\'s mobile culinary scene. Over 20 food trucks serving local seafood, BBQ, international eats, and gourmet desserts.',
    category: 'restaurant',
    venue: 'Rose Kennedy Greenway',
    location: 'Atlantic Ave, Boston, MA 02110',
    startDate: getRelativeDate(4, 11), // 4 days ahead, Saturday afternoon
    priceMin: 0,
    priceMax: 40,
    currency: 'USD',
    url: 'https://www.rosekennedygreenway.org',
    imageUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a24b5?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-lifestyle-1',
    title: 'Seaport Summer Cinema: Jurassic Park',
    description: 'Outdoor movie screening on the harbor. Grab a blanket, enjoy free popcorn, and watch a classic movie under the stars. First-come, first-served.',
    category: 'lifestyle',
    venue: 'The Rocks at Harbor Way',
    location: '111 Harbor Way, Boston, MA 02210',
    startDate: getRelativeDate(3, 19), // 3 days ahead, Friday evening
    priceMin: 0,
    priceMax: 0,
    currency: 'USD',
    url: 'https://www.bostonseaport.xyz',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  },
  {
    id: 'seed-promotion-1',
    title: 'Dine Out Boston: Summer Tasting Menu',
    description: 'Enjoy custom 3-course prix fixe lunches and dinners at premier restaurants across the city for a special promotional price.',
    category: 'promotion',
    venue: 'Participating Boston Restaurants',
    location: 'Multiple Locations, Boston, MA',
    startDate: getRelativeDate(0, 12), // Starts today
    endDate: getRelativeDate(10, 22), // Runs for 10 days
    priceMin: 28,
    priceMax: 46,
    currency: 'USD',
    url: 'https://www.meetboston.com/dineoutboston/',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop',
    sourceProvider: 'seed',
  }
];
