# Amber's Essential Touch agent contract

## Current phase

This repository is in `research_and_source_reconstruction`. The existing HTML is a historical snapshot, not authority to design, rebuild, deploy, schedule, sell, or publish. `content/research_status.json` is the machine-readable phase gate.

## Required start sequence

1. Read `content/project_context.json`.
2. Read `content/research_status.json` and `content/conflict_register.csv`.
3. Query the relevant evidence table before stating a fact.
4. Cite `source_id` and `source_locator` in any research conclusion.
5. If a source is absent at its original path, consult `content/relocation_map.csv` before saying it is missing.

## Hard boundaries

- Do not build or revise the site while `site_implementation_authorized` is `false`.
- Do not deploy, push Render changes, create scheduling flows, connect Google Workspace, add commerce, or change public forms.
- Do not create placeholder services, prices, products, testimonials, images, claims, links, or integrations.
- Do not choose between conflicting prices or experience claims. Report the conflict and its sources.
- Do not publish owner formula ratios, batch costing, production procedure, or the restricted pages identified in the PDF registers.
- Do not reuse a generated product label as an approved label.
- Do not publish the explicitly rejected dark product-family group.
- Do not replace the approved lotus monogram with a generated redraw or legacy mark.
- Do not describe OCR text as verified business data. OCR is searchable research aid only.
- Do not treat an existing repo page as current merely because it is coded.

## Source authority

Use the narrowest source that directly supports the claim. When sources disagree, authority does not erase the conflict.

1. Explicit current owner direction and owner-approved assets.
2. First-party owner source documents and photographs.
3. Date-bound business snapshots and professional records.
4. Curated evidence tables derived from those sources.
5. Existing repo content models and pages.
6. Generated concepts, competitor references, and historical exports.

See `docs/SOURCE_AUTHORITY.md` for scope-specific rules.

## Evidence surfaces

- `content/service_menu_observations.csv`: 36 exact detailed menu observations from uploaded screenshots.
- `content/service_price_evidence.csv`: later grouped service/pricing observations.
- `content/product_price_evidence.csv`: current candidate and concept-only price observations.
- `content/product_research_evidence.csv`: product claims, formula boundaries, and safety gates.
- `content/business_fact_evidence.csv`: dated business and professional facts.
- `content/copy_evidence.csv`: source phrases and claim risks.
- `content/design_direction_evidence.csv`: scope-specific owner art direction.
- `content/competitor_reference_index.csv`: supplied reference-PDF analysis, not market fact.
- `data/research/visual_asset_register.csv`: every readable image instance, approval state, review batch, and identity sensitivity.
- `data/research/pdf_page_register.csv`: every unique PDF page and visual review batch.
- `data/research/pdf_page_text.jsonl`: page-complete embedded text/OCR/restriction layer.
- `data/research/archive_member_register.csv`: every archive member and hash.
- `data/research/source_asset_register.csv`: all located, relocated, unreadable, and exact-path-missing source instances.

## Image rules

- Preserve each source image and its provenance; do not flatten approval states.
- The approved logo is the owner-designated lotus monogram file.
- Amber portraits and hand references are identity-sensitive. No generative identity alteration or publication without approval.
- Existing dark service-card crops are source-specific and superseded in tone by sunlight, flowers, moisture, gradients, and warm light pink.
- Site hero imagery contains no product mockups.
- Product imagery remains a separate future phase.

## Completion gates

Research can be signed off only after Amber resolves:

- the detailed menu versus later grouped service prices;
- the oil size and price versions;
- 15+ years versus 18 years licensed;
- product label and SKU approval;
- rights and consent for people shown;
- current contact, address, hours, reviews, and scheduling policy;
- confidentiality handling for formula and costing sources.

Until then, report `research_complete: false` accurately. A complete extraction system does not mean the business decisions are approved.

## Rebuild and validation

Run, in order:

```text
python3 automation/build_research_system.py
python3 automation/extract_pdf_page_text.py
python3 automation/validate_research_system.py
```

The generators read source files without changing them. Only generated research outputs are rewritten.
