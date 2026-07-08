import React from 'react';
import { Compass, Music, Heart, Map } from 'lucide-react';

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

interface ExamplePrompt {
  text: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    text: 'What concerts or music events are happening in Boston this Friday night?',
    label: 'Concerts this Friday',
    icon: Music,
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40',
  },
  {
    text: 'Show me cheap or free wellness events and yoga classes this weekend.',
    label: 'Wellness & Yoga',
    icon: Heart,
    color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/40',
  },
  {
    text: 'Find some outdoor recreation or kayaking events around the Charles River.',
    label: 'Outdoor & Kayaking',
    icon: Compass,
    color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/40',
  },
  {
    text: 'Any museums or art exhibitions to check out this Thursday evening?',
    label: 'Museums & Art',
    icon: Map,
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/40',
  },
];

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-2xl mx-auto my-auto">
      <div className="glowing-orb-container">
        <div className="glowing-orb-glow" />
        <div className="glowing-orb" />
      </div>

      <h1 className="text-[54px] font-semibold tracking-tight text-zinc-900 dark:text-white mb-2 leading-none">
        Hey Alex
      </h1>
      <p className="text-[28px] font-light tracking-tight text-zinc-400 dark:text-zinc-400 mb-10 leading-normal">
        what would you like to do?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {EXAMPLE_PROMPTS.map((prompt, idx) => {
          const Icon = prompt.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(prompt.text)}
              className={`flex items-start text-left p-4 rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 group`}
            >
              <div className={`p-2 rounded-lg mr-3 border shrink-0 ${prompt.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 mb-0.5 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  {prompt.label}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  &ldquo;{prompt.text}&rdquo;
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
