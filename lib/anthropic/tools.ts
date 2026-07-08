import { Tool } from '@anthropic-ai/sdk/resources/index.mjs';

export const TOOLS: Tool[] = [
  {
    name: 'search_events',
    description: 'Search for things to do, events, places, or activities in Boston. You must use this tool before recommending specific activities or venues to ensure information is accurate and matches current events.',
    input_schema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: [
            'museum',
            'sports',
            'concert',
            'market',
            'outdoor',
            'promotion',
            'science',
            'restaurant',
            'lifestyle',
            'wellness'
          ],
          description: 'Filter events by specific categories.',
        },
        keywords: {
          type: 'string',
          description: 'Search keywords to search in event names, venues, or descriptions (e.g. "DJ", "kayak", "sunset", "cheap", "free").',
        },
        dateStart: {
          type: 'string',
          description: 'ISO string (e.g. "2026-07-07T12:00:00Z" or just "2026-07-07") indicating start of search range.',
        },
        dateEnd: {
          type: 'string',
          description: 'ISO string indicating end of search range.',
        },
        priceMax: {
          type: 'number',
          description: 'Maximum price limit in USD (enter 0 to explicitly search for free events).',
        },
      },
      required: [],
    },
  },
];
