# Boston AI Concierge — MVP Build

Boston AI Concierge is a chat-first web application designed to help users discover things to do in Boston. It features a responsive, glassmorphic layout inspired by Claude.ai and integrates live event searches.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (Vanilla CSS variables configuration)
- **AI Integration**: Anthropic SDK (using Claude 3.5 Sonnet) with multi-turn server-side tool use.
- **APIs**: Ticketmaster Discovery API for live concerts, sports, and lifestyle/theater events.

---

## Getting Started

### 1. Configure Environment Variables
Copy the template `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Open `.env.local` and configure your API keys:
```env
# Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-latest

# Ticketmaster API Key (Optional)
# Sign up at: https://developer.ticketmaster.com/
TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
```

### 2. Run the Development Server
Install dependencies and run local dev:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architectural Decisions & Deferrals

### Why is there no Database? (Prisma / Postgres Deferral)
Since cross-session user authentication and conversation histories are deferred, the app is entirely **stateless** during this iteration:
- The client-side components maintain conversation history in-memory and send the full history to the `/api/chat` POST route on each turn.
- Events queried from external sources are aggregated, sorted, and stored in a short-lived (5-minute TTL) in-memory cache to prevent redundant API hits during the Claude multi-turn loop.

### Future Database Path
To introduce persistence, auth, and long-term user preferences later:
1. Add Prisma schema: mirror the `BostonEvent` interface (`lib/events/types.ts`) and the `CuratedSource` model (`data/sources.ts`) into a `schema.prisma` file.
2. Initialize database migration (e.g. Postgres on Neon or Supabase).
3. Create a DB-backed EventProvider implementing `EventProvider` inside `lib/events/providers/`.
4. Swap the memory-based cache inside `lib/events/cache.ts` for database reads/writes.
