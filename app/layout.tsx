import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TopBar } from '@/components/ui/TopBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Boston AI Concierge — Discover Things to Do in Boston',
  description: 'An AI-driven chat concierge to discover live events, concerts, museums, food markets, and wellness activities across Boston.',
  keywords: 'Boston, events, concierge, AI assistant, travel guide, tickets, sports, museum, things to do',
  authors: [{ name: 'Boston AI Concierge Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-zinc-50/50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <TopBar />
        <div className="flex flex-col flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
