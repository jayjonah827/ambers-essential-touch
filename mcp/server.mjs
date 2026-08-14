#!/usr/bin/env node
/** Read-only MCP server for Amber's Essential Touch research evidence. */

import fs from "node:fs/promises"
import path from "node:path"
import readline from "node:readline"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const FILES = {
  context: "content/project_context.json",
  status: "content/research_status.json",
  conflicts: "content/conflict_register.csv",
  relocations: "content/relocation_map.csv",
  services_detailed: "content/service_menu_observations.csv",
  services_grouped: "content/service_price_evidence.csv",
  services_catalog: "content/service_catalog.csv",
  products_prices: "content/product_price_evidence.csv",
  products_catalog: "content/product_catalog_candidates.csv",
  products_research: "content/product_research_evidence.csv",
  business: "content/business_fact_evidence.csv",
  copy: "content/copy_evidence.csv",
  design: "content/design_direction_evidence.csv",
  competitors: "content/competitor_reference_index.csv",
  topics: "content/research_topic_index.csv",
  sources: "data/research/source_asset_register.csv",
  visuals: "data/research/visual_asset_register.csv",
  archives: "data/research/archive_member_register.csv",
  pdf_pages: "data/research/pdf_page_register.csv",
  pdf_text: "data/research/pdf_page_text.jsonl",
}

const TOOLS = [
  {
    name: "get_project_context",
    description: "Read the phase, hard boundaries, source authority, gates, and evidence routing before other work.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_research_status",
    description: "Return current source counts and completion gates. This does not authorize implementation.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_sources",
    description: "List source instances, including relocated, unreadable, duplicated, and original-path-missing records.",
    inputSchema: pageSchema({ source_id: { type: "string" }, status: { type: "string" }, query: { type: "string" } }),
  },
  {
    name: "list_visual_assets",
    description: "List tracked image instances with review batch, approval, usage, embedded text, and identity sensitivity.",
    inputSchema: pageSchema({
      source_id: { type: "string" }, approval_status: { type: "string" }, usage_status: { type: "string" },
      review_batch: { type: "string" }, query: { type: "string" },
    }),
  },
  {
    name: "list_services",
    description: "Return the detailed uploaded menu, later grouped prices, candidate catalog, or all versions without resolving conflicts.",
    inputSchema: { type: "object", properties: { mode: { type: "string", enum: ["detailed", "grouped", "catalog", "all"] } }, additionalProperties: false },
  },
  {
    name: "list_products",
    description: "Return product price observations, product candidates, restricted research boundaries, or all versions.",
    inputSchema: { type: "object", properties: { mode: { type: "string", enum: ["prices", "catalog", "research", "all"] } }, additionalProperties: false },
  },
  {
    name: "list_business_facts",
    description: "Return business facts with temporal status and publication rules.",
    inputSchema: { type: "object", properties: { field: { type: "string" } }, additionalProperties: false },
  },
  {
    name: "list_copy_evidence",
    description: "Return source copy with voice status, claim risk, and usage rule.",
    inputSchema: { type: "object", properties: { query: { type: "string" } }, additionalProperties: false },
  },
  {
    name: "list_conflicts",
    description: "Return unresolved, resolved, superseded, and rejected conflicts. Never choose a side automatically.",
    inputSchema: { type: "object", properties: { status: { type: "string" } }, additionalProperties: false },
  },
  {
    name: "list_pdf_pages",
    description: "List unique PDF pages with extraction/review status and redacted excerpts where required.",
    inputSchema: pageSchema({ source_id: { type: "string" }, query: { type: "string" } }),
  },
  {
    name: "search_research",
    description: "Search curated evidence and page text. OCR matches remain non-authoritative until corroborated.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: { type: "string", minLength: 2 },
        domains: { type: "array", items: { type: "string", enum: ["services", "products", "business", "copy", "design", "competitors", "topics", "pdf_text"] } },
        limit: { type: "integer", minimum: 1, maximum: 100 },
      },
      additionalProperties: false,
    },
  },
]

function pageSchema(extra) {
  return {
    type: "object",
    properties: { ...extra, limit: { type: "integer", minimum: 1, maximum: 250 }, offset: { type: "integer", minimum: 0 } },
    additionalProperties: false,
  }
}

async function readRaw(key) {
  const relative = FILES[key]
  if (!relative) throw new Error(`Unknown evidence key: ${key}`)
  return fs.readFile(path.join(ROOT, relative), "utf8")
}

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ""
  let quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1 }
      else if (character === '"') quoted = false
      else field += character
    } else if (character === '"') quoted = true
    else if (character === ",") { row.push(field); field = "" }
    else if (character === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = "" }
    else field += character
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row) }
  const headers = rows.shift() ?? []
  return rows.filter(values => values.some(Boolean)).map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])))
}

async function readRows(key) {
  const raw = await readRaw(key)
  if (FILES[key].endsWith(".jsonl")) return raw.split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line))
  return parseCsv(raw)
}

function matches(row, filters = {}) {
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === "") continue
    if (key === "query") {
      const haystack = JSON.stringify(row).toLowerCase()
      if (!haystack.includes(String(value).toLowerCase())) return false
    } else if (String(row[key] ?? "").toLowerCase() !== String(value).toLowerCase()) return false
  }
  return true
}

function page(rows, args = {}) {
  const offset = Number(args.offset ?? 0)
  const limit = Math.min(Number(args.limit ?? 100), 250)
  const filters = Object.fromEntries(Object.entries(args).filter(([key]) => !["offset", "limit"].includes(key)))
  const filtered = rows.filter(row => matches(row, filters))
  return { total: filtered.length, offset, limit, rows: filtered.slice(offset, offset + limit) }
}

function result(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] }
}

async function callTool(name, args = {}) {
  if (name === "get_project_context") return result(JSON.parse(await readRaw("context")))
  if (name === "get_research_status") return result(JSON.parse(await readRaw("status")))
  if (name === "list_sources") return result(page(await readRows("sources"), args))
  if (name === "list_visual_assets") return result(page(await readRows("visuals"), args))
  if (name === "list_services") {
    const mode = args.mode ?? "all"
    const data = {}
    if (["detailed", "all"].includes(mode)) data.detailed_uploaded_menu = await readRows("services_detailed")
    if (["grouped", "all"].includes(mode)) data.later_grouped_prices = await readRows("services_grouped")
    if (["catalog", "all"].includes(mode)) data.candidate_catalog = await readRows("services_catalog")
    return result(data)
  }
  if (name === "list_products") {
    const mode = args.mode ?? "all"
    const data = {}
    if (["prices", "all"].includes(mode)) data.price_observations = await readRows("products_prices")
    if (["catalog", "all"].includes(mode)) data.candidate_catalog = await readRows("products_catalog")
    if (["research", "all"].includes(mode)) data.research_and_safety = await readRows("products_research")
    return result(data)
  }
  if (name === "list_business_facts") return result((await readRows("business")).filter(row => !args.field || row.field === args.field))
  if (name === "list_copy_evidence") return result((await readRows("copy")).filter(row => matches(row, { query: args.query })))
  if (name === "list_conflicts") return result((await readRows("conflicts")).filter(row => !args.status || row.status === args.status))
  if (name === "list_pdf_pages") return result(page(await readRows("pdf_pages"), args))
  if (name === "search_research") return result(await searchResearch(args))
  throw new Error(`Unknown read-only tool: ${name}`)
}

async function searchResearch(args) {
  const domainFiles = {
    services: ["services_detailed", "services_grouped", "services_catalog"],
    products: ["products_prices", "products_catalog", "products_research"],
    business: ["business"], copy: ["copy"], design: ["design"], competitors: ["competitors"], topics: ["topics"], pdf_text: ["pdf_text"],
  }
  const domains = args.domains?.length ? args.domains : Object.keys(domainFiles)
  const query = String(args.query).toLowerCase()
  const limit = Math.min(Number(args.limit ?? 50), 100)
  const matchesFound = []
  for (const domain of domains) {
    for (const key of domainFiles[domain] ?? []) {
      for (const row of await readRows(key)) {
        if (JSON.stringify(row).toLowerCase().includes(query)) matchesFound.push({ domain, dataset: key, row })
        if (matchesFound.length >= limit) return { query: args.query, limit, results: matchesFound }
      }
    }
  }
  return { query: args.query, limit, results: matchesFound }
}

const RESOURCES = [
  ["amber://project/context", "context", "Project context and hard boundaries", "application/json"],
  ["amber://research/status", "status", "Research status and gates", "application/json"],
  ["amber://research/conflicts", "conflicts", "Conflict register", "text/csv"],
  ["amber://research/services/detailed", "services_detailed", "Detailed uploaded service menu", "text/csv"],
  ["amber://research/visuals", "visuals", "Visual asset register", "text/csv"],
]

async function handle(message) {
  const { id, method, params = {} } = message
  try {
    let response
    if (method === "initialize") response = {
      protocolVersion: params.protocolVersion ?? "2024-11-05",
      capabilities: { tools: { listChanged: false }, resources: { subscribe: false, listChanged: false } },
      serverInfo: { name: "ambers-essential-touch-research", version: "1.0.0" },
      instructions: "Read-only source evidence. Read project context and conflicts before answering. No site implementation is authorized.",
    }
    else if (method === "ping") response = {}
    else if (method === "tools/list") response = { tools: TOOLS }
    else if (method === "tools/call") response = await callTool(params.name, params.arguments ?? {})
    else if (method === "resources/list") response = { resources: RESOURCES.map(([uri, , name, mimeType]) => ({ uri, name, mimeType })) }
    else if (method === "resources/read") {
      const resource = RESOURCES.find(([uri]) => uri === params.uri)
      if (!resource) throw new Error(`Unknown resource: ${params.uri}`)
      response = { contents: [{ uri: resource[0], mimeType: resource[3], text: await readRaw(resource[1]) }] }
    }
    else if (method?.startsWith("notifications/")) return
    else throw new Error(`Unsupported method: ${method}`)
    if (id !== undefined) process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, result: response })}\n`)
  } catch (error) {
    if (id !== undefined) process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32603, message: error.message } })}\n`)
  }
}

const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity })
for await (const line of input) {
  if (!line.trim()) continue
  try { await handle(JSON.parse(line)) }
  catch (error) { process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: error.message } })}\n`) }
}
