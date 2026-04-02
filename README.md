# @pipeworx/mcp-zenquotes

MCP server for inspirational quotes from ZenQuotes

## Tools

| Tool | Description |
|------|-------------|
| `random_quote` | Get a single random inspirational quote |
| `today_quote` | Get the quote of the day |
| `list_quotes` | Get a batch of 50 random inspirational quotes |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "random_quote",
      "arguments": {}
    }
  }'
```

## License

MIT
