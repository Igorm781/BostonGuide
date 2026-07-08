import { BostonEvent } from '../events/types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  events?: BostonEvent[]; // Attach structured event recommendations directly to the message bubble
}
