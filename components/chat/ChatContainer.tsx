'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/chat/types';
import { parseSSEStream } from '@/lib/chat/sse';
import { BostonEvent } from '@/lib/events/types';
import { EmptyState } from './EmptyState';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { AlertCircle } from 'lucide-react';

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessagePlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      events: [],
    };

    // Optimistically add user message and assistant placeholder to chat stream
    setMessages((prev) => [...prev, userMessage, assistantMessagePlaceholder]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Build a clean text-only message array for the server request
      const payloadMessages = messages
        .concat(userMessage)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Request failed with status ${response.status}`);
      }

      let textAccumulator = '';
      let eventsAccumulator: BostonEvent[] = [];

      await parseSSEStream(response, {
        onToken: (token: string) => {
          textAccumulator += token;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: textAccumulator }
                : msg
            )
          );
        },
        onToolResult: (toolName: string, events: BostonEvent[]) => {
          // Merge unique events to prevent duplicates from overlapping streams
          const uniqueEvents = [...eventsAccumulator];
          events.forEach((evt) => {
            if (!uniqueEvents.some((u) => u.id === evt.id)) {
              uniqueEvents.push(evt);
            }
          });
          eventsAccumulator = uniqueEvents;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, events: eventsAccumulator }
                : msg
            )
          );
        },
        onError: (streamErr: string) => {
          setError(streamErr);
          setIsLoading(false);
        },
        onDone: () => {
          setIsLoading(false);
        },
      });
    } catch (err: unknown) {
      console.error('Error sending user prompt:', err);
      const errMsg = err instanceof Error ? err.message : 'An error occurred. Check server logs.';
      setError(errMsg);
      setIsLoading(false);

      // Clean up the blank assistant bubble if we failed early before streaming anything
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (
          last &&
          last.id === assistantMessageId &&
          !last.content &&
          (!last.events || last.events.length === 0)
        ) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-zinc-50/30 dark:bg-zinc-950/20">
      {/* Scrollable message panel */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-4xl min-h-full flex flex-col justify-between">
          {messages.length === 0 ? (
            <EmptyState onSelectPrompt={handleSelectPrompt} />
          ) : (
            <MessageList messages={messages} />
          )}
        </div>
      </div>

      {/* Sticky footer input area */}
      <div className="sticky bottom-0 border-t border-zinc-200/50 bg-white/85 backdrop-blur-md px-4 py-4 dark:border-zinc-800/50 dark:bg-zinc-950/85">
        <div className="mx-auto max-w-4xl space-y-3">
          {/* Error Banner display */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-rose-100 bg-rose-50/50 p-3.5 text-xs text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <div className="flex-1 font-medium">{error}</div>
              <button
                onClick={() => setError(null)}
                className="text-[10px] uppercase font-bold hover:underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => handleSendMessage(input)}
            isLoading={isLoading}
          />

        </div>
      </div>
    </div>
  );
}
