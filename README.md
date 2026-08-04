# mcp-zenquotes

ZenQuotes MCP — wraps ZenQuotes API (free, no auth) with a dummyjson

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_quote` | Fetch a single random inspirational quote (author + text) from ZenQuotes; falls back to dummyjson automatically if ZenQuotes is unavailable. Response includes _source field when served from fallback. |
| `today_quote` | Get the quote of the day from ZenQuotes. Returns the same quote for all requests within a given day. |
| `list_quotes` | Fetch a batch of up to 50 random inspirational quotes (author + text each) from ZenQuotes; falls back to dummyjson if ZenQuotes is unavailable. Response includes count, quotes array, and _source when from fallback. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "zenquotes": {
      "url": "https://gateway.pipeworx.io/zenquotes/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Zenquotes data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
