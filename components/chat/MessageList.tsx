import { ChatMessage } from '@/lib/chat/types';
import { MessageBubble } from './MessageBubble';
import React, { useRef, useEffect } from 'react';

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full divide-y divide-zinc-100/30 dark:divide-zinc-800/10">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={listEndRef} className="h-6" />
    </div>
  );
}
