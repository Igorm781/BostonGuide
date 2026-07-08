import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error(
    'Missing ANTHROPIC_API_KEY environment variable. ' +
    'Please add ANTHROPIC_API_KEY to your .env.local file. ' +
    'You can obtain an API key from the Anthropic Console: https://console.anthropic.com/'
  );
}

export const anthropic = new Anthropic({
  apiKey,
});
