import { ChatMessage } from '@/lib/chat/types';
import { EventCardList } from './EventCardList';
import { Compass, User } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full gap-4 border-b border-zinc-100/50 py-6 dark:border-zinc-800/30 ${
      isUser ? 'justify-end' : 'justify-start'
    }`}>
      {/* Icon for Assistant */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <Compass className="h-4.5 w-4.5 text-zinc-700 dark:text-zinc-300" />
        </div>
      )}

      {/* Bubble Content */}
      <div className={`flex flex-col max-w-[90%] sm:max-w-[85%] ${
        isUser ? 'items-end' : 'items-start'
      }`}>
        {isUser ? (
          <div className="rounded-2xl bg-zinc-100 px-4 py-2.5 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 shadow-xs max-w-fit">
            {message.content}
          </div>
        ) : (
          <div className="text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed space-y-3 w-full">
            {message.content ? (
              message.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))
            ) : (
              // Stream indicator if content is empty but events aren't loaded yet
              <div className="flex items-center gap-1.5 py-1 text-zinc-400">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0.4s]" />
              </div>
            )}
          </div>
        )}

        {/* Embedded event list recommendations */}
        {message.events && message.events.length > 0 && (
          <div className="w-full">
            <EventCardList events={message.events} />
          </div>
        )}
      </div>

      {/* Icon for User */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border border-zinc-200 bg-zinc-900 text-white dark:border-zinc-800 dark:bg-zinc-50 dark:text-zinc-950">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
