# Research method

## Objective

Make every supplied Amber source discoverable, traceable, searchable, and approval-aware before any design or implementation begins.

## 1. Raw-first intake

`automation/disc_workflow.py` records one JSONL event for every observed or expected path before normalization. It captures path, status, bytes, hash, media metadata, PDF page count, archive count, and extraction branch. Sources are read only.

The initial run and the relocated-source run are retained separately under `data/intake/` so the later source discovery does not overwrite the earlier path evidence.

## 2. Relocation recovery

Several named files were not at the path originally supplied, but exact filenames were later found together in the nested owner folder. `content/relocation_map.csv` records original path, located path, match basis, and usage rule. Original-path absence remains part of provenance; it is not represented as continuing source unavailability.

## 3. Hash and archive normalization

Every file and archive member receives a SHA-256. Duplicate instances remain separate observations but share a duplicate group. The canonical pack uses content-addressed paths. Files over the repository materialization cap remain external with hash, size, metadata, page text, and review artifacts retained.

## 4. Visual inspection

Every readable image instance is assigned to a human-reviewed contact sheet. Duplicate fragment sets are reviewed by unique hash while every instance remains in the register. Every unique PDF page is rendered into a page-complete contact sheet. Invalid JPG pointer files remain explicit unreadable records.

## 5. Text extraction

PDF pages use embedded text where reliable and OCR where the source is image-only. Each page records its method. OCR is searchable aid and may not be used as business-fact authority without corroboration. Restricted product-formula and costing pages are redacted from repository text output.

## 6. Curated evidence

Curated CSVs preserve raw wording, source locator, evidence type, currentness, claim risk, approval status, and publication rule. A catalog candidate summarizes consistent observations but does not overwrite contradictory source rows.

## 7. Conflict preservation

Conflicts are never “cleaned up” by preference. `content/conflict_register.csv` identifies both observations, both sources, status, and the owner decision required.

## 8. Phase gate

`content/research_status.json` distinguishes extraction completion from owner approval. Site work stays blocked until research signoff is explicit.
