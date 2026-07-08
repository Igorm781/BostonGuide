import { EventCategory } from '../lib/events/categories';

export interface CuratedSource {
  name: string;
  url: string;
  description: string;
  neighborhood?: string;
}

export const CURATED_SOURCES: Record<EventCategory, CuratedSource[]> = {
  museum: [
    {
      name: 'Museum of Fine Arts (MFA)',
      url: 'https://www.mfa.org',
      description: 'One of the most comprehensive art museums in the world, featuring over 450,000 works of art.',
      neighborhood: 'Fenway-Kenmore',
    },
    {
      name: 'Institute of Contemporary Art (ICA)',
      url: 'https://www.icaboston.org',
      description: 'Stunning waterfront museum showcasing cutting-edge contemporary art, performances, and films.',
      neighborhood: 'Seaport District',
    },
    {
      name: 'Isabella Stewart Gardner Museum',
      url: 'https://www.gardnermuseum.org',
      description: 'A 15th-century Venetian-style palace displaying world-class art surrounding a gorgeous courtyard.',
      neighborhood: 'Fenway-Kenmore',
    },
    {
      name: 'WNDR Museum Boston',
      url: 'https://wndrmuseum.com/location/boston/',
      description: 'An interactive, multi-sensory art and technology experience that redefines the traditional museum.',
      neighborhood: 'Downtown / Theater District',
    },
  ],
  sports: [
    {
      name: 'Boston Red Sox (Fenway Park)',
      url: 'https://www.mlb.com/redsox',
      description: 'Catch a baseball game at America\'s oldest and most beloved ballpark.',
      neighborhood: 'Fenway',
    },
    {
      name: 'TD Garden (Celtics & Bruins)',
      url: 'https://www.tdgarden.com',
      description: 'Home of the historic Boston Celtics (NBA) and Boston Bruins (NHL).',
      neighborhood: 'West End',
    },
    {
      name: 'Gillette Stadium (Patriots & Revolution)',
      url: 'https://www.gillettestadium.com',
      description: 'New England Patriots football and Revolution soccer stadium located just south of the city.',
      neighborhood: 'Foxborough, MA',
    },
  ],
  concert: [
    {
      name: 'House of Blues Boston',
      url: 'https://www.houseofblues.com/boston',
      description: 'Popular concert hall hosting rock, blues, hip-hop, and pop acts steps from Fenway Park.',
      neighborhood: 'Fenway',
    },
    {
      name: 'Symphony Hall (Boston Symphony Orchestra)',
      url: 'https://www.bso.org',
      description: 'One of the world\'s acoustically finest concert halls, home to the BSO and Boston Pops.',
      neighborhood: 'Back Bay',
    },
    {
      name: 'Paradise Rock Club',
      url: 'https://www.crossroadspresents.com/pages/paradise-rock-club',
      description: 'Intimate venue hosting emerging indie, rock, and electronic artists since 1977.',
      neighborhood: 'Allston',
    },
    {
      name: 'MGM Music Hall at Fenway',
      url: 'https://www.mgmmusichallatfenway.com',
      description: 'State-of-the-art 5,000 capacity live music venue located next to Fenway Park.',
      neighborhood: 'Fenway',
    },
  ],
  market: [
    {
      name: 'SoWa Open Market',
      url: 'https://www.sowaboston.com',
      description: 'A bustling Sunday market bringing together local designers, artists, food trucks, and farmers.',
      neighborhood: 'South End',
    },
    {
      name: 'Boston Public Market',
      url: 'https://bostonpublicmarket.org',
      description: 'Year-round indoor market featuring fresh, locally sourced New England foods and products.',
      neighborhood: 'Downtown / Haymarket',
    },
    {
      name: 'Haymarket',
      url: 'https://www.haymarketboston.org',
      description: 'Historic open-air produce market operating Fridays and Saturdays with ultra-cheap fresh food.',
      neighborhood: 'North End Gateway',
    },
  ],
  outdoor: [
    {
      name: 'Charles River Esplanade',
      url: 'https://esplanade.org',
      description: 'State park with biking trails, playgrounds, docks, and the famous Hatch Shell amphitheater.',
      neighborhood: 'Back Bay / Beacon Hill',
    },
    {
      name: 'Boston Harbor Islands',
      url: 'https://www.bostonharborislands.org',
      description: 'A national park containing 34 islands just a short ferry ride from downtown Boston.',
      neighborhood: 'Boston Harbor',
    },
    {
      name: 'Paddle Boston (Kayaking & Paddleboarding)',
      url: 'https://paddleboston.com',
      description: 'Rentals and tours for exploring the Charles River from Kendall Square or Soldier\'s Field.',
      neighborhood: 'Cambridge / Allston',
    },
  ],
  promotion: [
    {
      name: 'Meet Boston (Dine Out Boston)',
      url: 'https://www.meetboston.com',
      description: 'Official tourism source listing seasonal promos, discount hotel packages, and Dine Out Boston weeks.',
      neighborhood: 'Citywide',
    },
    {
      name: 'Mayor\'s Office of Tourism (Boston.gov)',
      url: 'https://www.boston.gov/departments/tourism-sports-and-entertainment',
      description: 'Direct municipal listings of free summer events, outdoor concerts, block parties, and local guides.',
      neighborhood: 'Citywide',
    },
    {
      name: 'The Boston Calendar (Free Events List)',
      url: 'https://www.thebostoncalendar.com/?tags%5B%5D=Free',
      description: 'A user-generated directory with a robust filter specifically dedicated to free events in Boston.',
      neighborhood: 'Citywide',
    },
  ],
  science: [
    {
      name: 'Museum of Science (MoS)',
      url: 'https://www.mos.org',
      description: 'Interactive science exhibits, IMAX theater, planetarium, and the Gilliland observatory.',
      neighborhood: 'Science Park',
    },
    {
      name: 'MIT Museum',
      url: 'https://mitmuseum.mit.edu',
      description: 'Showcases MIT\'s groundbreaking innovations in robotics, AI, architecture, and photography.',
      neighborhood: 'Cambridge / Kendall Square',
    },
    {
      name: 'Harvard Museum of Natural History',
      url: 'https://hmnh.harvard.edu',
      description: 'Home of the famous Glass Flowers collection and vast exhibits of dinosaur fossils and minerals.',
      neighborhood: 'Cambridge / Harvard Square',
    },
  ],
  restaurant: [
    {
      name: 'Trillium Brewing Company (Beer Garden)',
      url: 'https://www.trilliumbrewing.com',
      description: 'Acclaimed local craft brewery featuring outdoor beer gardens on the Greenway and in Fort Point.',
      neighborhood: 'Fort Point / Greenway',
    },
    {
      name: 'Island Creek Oyster Bar (Row 34)',
      url: 'https://www.row34.com',
      description: 'High-end raw bar and local seafood destination showcasing New England oysters and craft beers.',
      neighborhood: 'Fort Point',
    },
    {
      name: 'The Tall Ships Boston',
      url: 'https://www.tallshipsboston.com',
      description: 'A 245-foot floating oyster bar and restaurant docked on the East Boston waterfront.',
      neighborhood: 'East Boston',
    },
    {
      name: 'Boston Public Market Culinary Studio',
      url: 'https://bostonpublicmarket.org/kitchen/',
      description: 'Cooking classes, demonstrations, and food events showcasing local chefs and local ingredients.',
      neighborhood: 'Downtown',
    },
  ],
  lifestyle: [
    {
      name: 'Boch Center (Wang & Shubert Theatres)',
      url: 'https://www.bochcenter.org',
      description: 'Historic venues hosting Broadway shows, stand-up comedy, theater, and concerts.',
      neighborhood: 'Theater District',
    },
    {
      name: 'Big Night Live',
      url: 'https://bignightlive.com',
      description: 'A luxury music hall and nightclub located at the Hub on Causeway.',
      neighborhood: 'West End',
    },
    {
      name: 'Coolidge Corner Theatre',
      url: 'https://coolidge.org',
      description: 'Historic independent cinema house showing indie films, documentaries, and cult classics.',
      neighborhood: 'Brookline, MA',
    },
  ],
  wellness: [
    {
      name: 'November Project Boston',
      url: 'https://november-project.com/boston/',
      description: 'Vibrant, free, outdoor group fitness classes taking place at Harvard Stadium and the Summit.',
      neighborhood: 'Allston / Brookline',
    },
    {
      name: 'Ritual Wellness (Yoga & Pilates)',
      url: 'https://www.ritualhotyoga.com',
      description: 'Boutique hot yoga studios offering intense, music-driven, candlelight flow sessions.',
      neighborhood: 'SOMA / North End',
    },
    {
      name: 'Boston Public Parks Fitness Series',
      url: 'https://www.boston.gov/departments/parks-and-recreation/boston-parks-fitness-series',
      description: 'Free, city-sponsored outdoor yoga, zumba, and strength classes across Boston public parks.',
      neighborhood: 'Citywide',
    },
  ],
};
