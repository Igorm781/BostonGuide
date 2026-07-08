export const EVENT_CATEGORIES = [
  'museum',
  'sports',
  'concert',
  'market',
  'outdoor',
  'promotion',
  'science',
  'restaurant',
  'lifestyle',
  'wellness',
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface CategoryTheme {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
}

export const CATEGORY_THEMES: Record<EventCategory, CategoryTheme> = {
  museum: {
    label: 'Museums & Art',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeText: 'text-indigo-600 dark:text-indigo-400',
    badgeBorder: 'border-indigo-100 dark:border-indigo-900/50',
    dotBg: 'bg-indigo-500',
  },
  sports: {
    label: 'Sports & Games',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    badgeBorder: 'border-emerald-100 dark:border-emerald-900/50',
    dotBg: 'bg-emerald-500',
  },
  concert: {
    label: 'Concerts & Music',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeText: 'text-rose-600 dark:text-rose-400',
    badgeBorder: 'border-rose-100 dark:border-rose-900/50',
    dotBg: 'bg-rose-500',
  },
  market: {
    label: 'Local Markets',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeText: 'text-amber-600 dark:text-amber-400',
    badgeBorder: 'border-amber-100 dark:border-amber-900/50',
    dotBg: 'bg-amber-500',
  },
  outdoor: {
    label: 'Outdoor Activities',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeText: 'text-teal-600 dark:text-teal-400',
    badgeBorder: 'border-teal-100 dark:border-teal-900/50',
    dotBg: 'bg-teal-500',
  },
  promotion: {
    label: 'Deals & Promotions',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeText: 'text-purple-600 dark:text-purple-400',
    badgeBorder: 'border-purple-100 dark:border-purple-900/50',
    dotBg: 'bg-purple-500',
  },
  science: {
    label: 'Science & Tech',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeText: 'text-cyan-600 dark:text-cyan-400',
    badgeBorder: 'border-cyan-100 dark:border-cyan-900/50',
    dotBg: 'bg-cyan-500',
  },
  restaurant: {
    label: 'Food & Dining',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40',
    badgeText: 'text-orange-600 dark:text-orange-400',
    badgeBorder: 'border-orange-100 dark:border-orange-900/50',
    dotBg: 'bg-orange-500',
  },
  lifestyle: {
    label: 'Lifestyle & Night',
    badgeBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
    badgeText: 'text-fuchsia-600 dark:text-fuchsia-400',
    badgeBorder: 'border-fuchsia-100 dark:border-fuchsia-900/50',
    dotBg: 'bg-fuchsia-500',
  },
  wellness: {
    label: 'Health & Wellness',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/40',
    badgeText: 'text-sky-600 dark:text-sky-400',
    badgeBorder: 'border-sky-100 dark:border-sky-900/50',
    dotBg: 'bg-sky-500',
  },
};

export function isValidCategory(cat: string): cat is EventCategory {
  return EVENT_CATEGORIES.includes(cat as EventCategory);
}
