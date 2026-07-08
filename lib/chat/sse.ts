import { BostonEvent } from '../events/types';

export interface StreamCallbacks {
  onToken: (text: string) => void;
  onToolResult: (toolName: string, events: BostonEvent[]) => void;
  onError: (error: string) => void;
  onDone: () => void;
}

/**
 * Custom SSE reader that parses chunk-by-chunk over a POST fetch readable stream.
 * Necessary because native EventSource does not support POST payloads.
 */
export async function parseSSEStream(
  response: Response,
  callbacks: StreamCallbacks
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError('Response body is not readable.');
    return;
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Separate blocks on SSE boundary: double newline
      const parts = buffer.split('\n\n');
      
      // Store the last chunk in the buffer if it is incomplete
      buffer = parts.pop() || '';

      for (const part of parts) {
        if (!part.trim()) continue;

        let eventType = '';
        let dataStr = '';

        const lines = part.split('\n');
        for (const line of lines) {
          if (line.startsWith('event:')) {
            eventType = line.replace(/^event:\s*/, '').trim();
          } else if (line.startsWith('data:')) {
            dataStr = line.replace(/^data:\s*/, '').trim();
          }
        }

        if (!eventType) continue;

        try {
          const parsedData = dataStr ? JSON.parse(dataStr) : {};

          switch (eventType) {
            case 'token':
              if (parsedData.text !== undefined) {
                callbacks.onToken(parsedData.text);
              }
              break;
            case 'tool_result':
              if (parsedData.toolName && Array.isArray(parsedData.events)) {
                callbacks.onToolResult(parsedData.toolName, parsedData.events);
              }
              break;
            case 'error':
              callbacks.onError(parsedData.error || 'Server stream error.');
              break;
            case 'done':
              callbacks.onDone();
              break;
            default:
              console.warn(`Unhandled SSE event type: ${eventType}`);
          }
        } catch (jsonErr) {
          console.error('Failed to parse SSE data block JSON:', jsonErr, 'Raw data:', dataStr);
        }
      }
    }
  } catch (err: unknown) {
    console.error('SSE reading error:', err);
    const errMsg = err instanceof Error ? err.message : 'Stream connection lost.';
    callbacks.onError(errMsg);
  } finally {
    reader.releaseLock();
  }
}
