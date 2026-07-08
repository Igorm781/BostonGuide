import React, { useRef, useEffect } from 'react';
import { ArrowUp, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = 'Ask the concierge about things to do in Boston...',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea height as content wraps
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      // Bound height so it doesn't grow infinitely
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative flex items-end w-full rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900 transition-all focus-within:border-zinc-300 dark:focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-200 dark:focus-within:ring-zinc-800"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="w-full resize-none bg-transparent py-4 pl-4 pr-16 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden dark:text-zinc-50 dark:placeholder-zinc-500 max-h-[200px]"
      />

      <div className="absolute right-3 bottom-3 flex items-center gap-2 z-10">
        <span className="hidden text-[10px] text-zinc-400 dark:text-zinc-500 sm:flex items-center gap-0.5">
          <span>Enter</span>
          <CornerDownLeft className="h-2.5 w-2.5" />
        </span>
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-white transition-all cursor-pointer ${
            value.trim() && !isLoading
              ? 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
              : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </button>
      </div>
    </form>
  );
}
