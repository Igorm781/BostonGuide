import { NextRequest } from 'next/server';
import { anthropic } from '@/lib/anthropic/client';
import { TOOLS } from '@/lib/anthropic/tools';
import { getSystemPrompt, DEFAULT_MODEL } from '@/lib/anthropic/systemPrompt';
import { searchEvents } from '@/lib/events/aggregator';
import Anthropic from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic';

interface MessagePayload {
  role: 'user' | 'assistant';
  content: string;
}

interface PendingToolCall {
  id: string;
  name: string;
  input: string;
}

interface ParsedToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: MessagePayload[] };

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload: messages array is required.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        // Helper to send formatted SSE messages
        function sendEvent(type: string, data: unknown) {
          try {
            controller.enqueue(
              encoder.encode(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`)
            );
          } catch (e) {
            console.error('Error enqueuing stream chunk:', e);
          }
        }

        try {
          // Deep-copy messages to manipulate for the in-flight loop
          // Filter to send only clean text-based history to avoid schema errors on past turns
          const apiMessages: Anthropic.MessageParam[] = messages.map((m) => ({
            role: m.role,
            content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
          }));

          let loopCount = 0;
          const maxLoops = 4;
          let continueLoop = true;

          while (continueLoop && loopCount < maxLoops) {
            loopCount++;

            const systemPrompt = getSystemPrompt(new Date().toISOString());
            const modelName = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;

            // Start stream from Anthropic
            const anthropicStream = await anthropic.messages.create({
              model: modelName,
              max_tokens: 4000,
              system: systemPrompt,
              messages: apiMessages,
              tools: TOOLS,
              stream: true,
            });

            let textAccumulator = '';
            let activeToolCall: PendingToolCall | null = null;
            const toolCallsToRun: ParsedToolCall[] = [];

            for await (const chunk of anthropicStream) {
              if (chunk.type === 'content_block_start') {
                if (chunk.content_block.type === 'tool_use') {
                  activeToolCall = {
                    id: chunk.content_block.id,
                    name: chunk.content_block.name,
                    input: '',
                  };
                }
              } else if (chunk.type === 'content_block_delta') {
                if (chunk.delta.type === 'text_delta') {
                  const text = chunk.delta.text;
                  textAccumulator += text;
                  sendEvent('token', { text });
                } else if (chunk.delta.type === 'input_json_delta') {
                  if (activeToolCall) {
                    activeToolCall.input += chunk.delta.partial_json;
                  }
                }
              } else if (chunk.type === 'content_block_stop') {
                if (activeToolCall) {
                  let parsedInput: Record<string, unknown> = {};
                  try {
                    parsedInput = JSON.parse(activeToolCall.input || '{}');
                  } catch {
                    parsedInput = {};
                  }
                  toolCallsToRun.push({
                    id: activeToolCall.id,
                    name: activeToolCall.name,
                    input: parsedInput,
                  });
                  activeToolCall = null;
                }
              }
            }

            if (toolCallsToRun.length > 0) {
              // Build the intermediate assistant message containing the tool use(s)
              const assistantContent: Array<Anthropic.TextBlockParam | Anthropic.ToolUseBlockParam> = [];
              if (textAccumulator) {
                assistantContent.push({ type: 'text', text: textAccumulator });
              }
              
              toolCallsToRun.forEach((tc) => {
                assistantContent.push({
                  type: 'tool_use',
                  id: tc.id,
                  name: tc.name,
                  input: tc.input,
                });
              });

              // Add to history
              apiMessages.push({
                role: 'assistant',
                content: assistantContent,
              });

              // Execute tool actions and compile results
              const toolResultContent: Array<Anthropic.ToolResultBlockParam> = [];
              for (const tc of toolCallsToRun) {
                if (tc.name === 'search_events') {
                  const searchResults = await searchEvents(tc.input);

                  // Send structured cards to frontend
                  sendEvent('tool_result', {
                    toolName: tc.name,
                    events: searchResults,
                  });

                  toolResultContent.push({
                    type: 'tool_result',
                    tool_use_id: tc.id,
                    content: JSON.stringify(searchResults),
                  });
                } else {
                  toolResultContent.push({
                    type: 'tool_result',
                    tool_use_id: tc.id,
                    content: JSON.stringify({ error: `Tool ${tc.name} not found.` }),
                  });
                }
              }

              // Add tool results to user messages history to prompt the next loop iteration
              apiMessages.push({
                role: 'user',
                content: toolResultContent,
              });
            } else {
              // No tools were called, meaning Claude is finished answering
              continueLoop = false;
            }
          }

          sendEvent('done', {});
          controller.close();
        } catch (streamErr: unknown) {
          console.error('Error during Anthropic streaming loop:', streamErr);
          const errMsg = streamErr instanceof Error ? streamErr.message : 'Stream processing failed.';
          sendEvent('error', { error: errMsg });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err: unknown) {
    console.error('Fatal API chat handler error:', err);
    const errMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return new Response(
      JSON.stringify({ error: errMsg }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
