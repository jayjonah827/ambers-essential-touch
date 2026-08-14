# Amber's Essential Touch — source research system

This repository is currently a source and evidence system. It is not an approved site build.

The owner supplied specific images, archives, PDFs, service menus, prices, product studies, voice sources, professional history, social references, and design research. They are now tracked by path, hash, page, archive member, visual review batch, approval state, currentness, and publication rule.

## Start here

1. [`AGENTS.md`](AGENTS.md) — mandatory phase and evidence contract.
2. [`content/project_context.json`](content/project_context.json) — machine-readable project routing.
3. [`content/research_status.json`](content/research_status.json) — current counts and completion gates.
4. [`content/conflict_register.csv`](content/conflict_register.csv) — decisions that cannot be guessed.
5. [`docs/DATA_DICTIONARY.md`](docs/DATA_DICTIONARY.md) — table meanings.

## What was extracted

- exact raw-disk intake events, including original-path absence and relocated recovery;
- a SHA-256 source register and content-addressed source pack;
- every archive member;
- every readable image instance, including duplicates, fragments, and rejection evidence;
- every unique PDF page with full contact-sheet review;
- page-complete embedded text or OCR with method labels;
- 36 exact detailed service-menu observations plus later grouped service pricing;
- current-candidate and concept-only product price versions;
- business facts, professional evidence, copy, design direction, competitor-reference analysis, claims risks, and conflicts;
- a read-only MCP interface for agent access.

## Research boundary

The extraction system is operational, but `research_complete` remains `false` until Amber resolves pricing versions, experience wording, current business details, rights and consent, product approval, and source confidentiality.

No site, booking, commerce, deployment, or placeholder workflow was created by this research phase. The existing HTML and JavaScript predate this research system and remain a non-authoritative historical snapshot.

## Rebuild and validate

```text
python3 automation/build_research_system.py
python3 automation/extract_pdf_page_text.py
python3 automation/validate_research_system.py
```

## Agent access

The zero-dependency read-only MCP server is `mcp/server.mjs`. See `mcp/README.md` and `mcp/mcp-config.example.json`.
