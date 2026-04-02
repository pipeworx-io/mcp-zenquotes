/**
 * ZenQuotes MCP — wraps ZenQuotes API (free, no auth)
 *
 * Tools:
 * - random_quote: Get a random inspirational quote
 * - today_quote: Get today's quote of the day
 * - list_quotes: Get a list of quotes
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://zenquotes.io/api';

type RawQuote = {
  q: string;
  a: string;
  h: string;
};

function formatQuote(q: RawQuote) {
  return {
    quote: q.q,
    author: q.a,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_quote',
    description: 'Get a single random inspirational quote.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'today_quote',
    description: "Get the quote of the day from ZenQuotes. Returns the same quote for all requests within a given day.",
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_quotes',
    description: 'Get a batch of 50 random inspirational quotes.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, _args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_quote':
      return randomQuote();
    case 'today_quote':
      return todayQuote();
    case 'list_quotes':
      return listQuotes();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomQuote() {
  const res = await fetch(`${BASE_URL}/random`);
  if (!res.ok) throw new Error(`ZenQuotes error: ${res.status}`);

  const data = (await res.json()) as RawQuote[];
  if (!data || data.length === 0) throw new Error('ZenQuotes error: empty response');

  return formatQuote(data[0]!);
}

async function todayQuote() {
  const res = await fetch(`${BASE_URL}/today`);
  if (!res.ok) throw new Error(`ZenQuotes error: ${res.status}`);

  const data = (await res.json()) as RawQuote[];
  if (!data || data.length === 0) throw new Error('ZenQuotes error: empty response');

  return formatQuote(data[0]!);
}

async function listQuotes() {
  const res = await fetch(`${BASE_URL}/quotes`);
  if (!res.ok) throw new Error(`ZenQuotes error: ${res.status}`);

  const data = (await res.json()) as RawQuote[];
  if (!data) throw new Error('ZenQuotes error: empty response');

  return {
    count: data.length,
    quotes: data.map(formatQuote),
  };
}

export default { tools, callTool } satisfies McpToolExport;
