# Read-only research MCP

`server.mjs` exposes the repository evidence to an agent without write, mutation, network, site-build, scheduling, commerce, or deployment tools.

The server uses only Node.js built-ins. It supports MCP initialization, tools, and selected resources over standard-input JSON-RPC.

## First calls

1. `get_project_context`
2. `get_research_status`
3. `list_conflicts`
4. the narrow evidence tool needed for the question

## Evidence behavior

- Service and product tools preserve all observations while `content/project_context.json` supplies the resolved authority: detailed uploaded services are canonical; grouped site values are secondary; repeated existing product prices are working evidence; generated relaunch values are excluded concepts.
- Search results identify the dataset.
- OCR is labeled in `pdf_page_text.jsonl` and is not business-fact authority.
- Restricted formula and costing text is not exposed.
- All tools are read-only.

## Local command

```text
node mcp/server.mjs
```

Use the absolute path form in `mcp-config.example.json` after cloning elsewhere.
