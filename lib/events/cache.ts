import { BostonEvent } from './types';
import { EventSearchQuery } from './providers/provider';

interface CacheEntry {
  events: BostonEvent[];
  expiresAt: number;
}

export class InMemoryEventCache {
  private cache = new Map<string, CacheEntry>();
  private ttlMs: number;

  constructor(ttlMinutes: number = 5) {
    this.ttlMs = ttlMinutes * 60 * 1000;
  }

  private generateKey(query: EventSearchQuery): string {
    // Sort keys to ensure consistent key generation regardless of property order
    return JSON.stringify(query, Object.keys(query).sort());
  }

  get(query: EventSearchQuery): BostonEvent[] | null {
    const key = this.generateKey(query);
    const entry = this.cache.get(key);
    
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.events;
  }

  set(query: EventSearchQuery, events: BostonEvent[]): void {
    const key = this.generateKey(query);
    this.cache.set(key, {
      events,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Export a single global cache instance
export const eventCache = new InMemoryEventCache(5);
