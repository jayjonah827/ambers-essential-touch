# Data dictionary

## Content layer

- `business_fact_evidence.csv`: one factual observation per source, with temporal and publication rules.
- `competitor_reference_index.csv`: page-range analysis of the supplied reference PDF; observational, not independently verified market research.
- `conflict_register.csv`: contradictory or superseded observations and required resolution.
- `copy_evidence.csv`: exact phrases, voice status, risk, and usage rule.
- `design_direction_evidence.csv`: owner and source art direction separated by scope and priority.
- `product_catalog_candidates.csv`: summarized product candidates, not approved SKUs.
- `product_price_evidence.csv`: every extracted product-price observation, including concept-only alternatives.
- `product_research_evidence.csv`: formula, usage, safety, claim, and confidentiality boundaries.
- `relocation_map.csv`: original path to recovered path mapping.
- `research_topic_index.csv`: source and page-range routing.
- `service_catalog.csv`: summarized later service model, not a final menu.
- `service_menu_observations.csv`: exact 36-line detailed uploaded menu.
- `service_price_evidence.csv`: later grouped service observations.
- `source_files.csv`: individually named sources and original-path statuses.
- `source_roots.csv`: recursively scanned source packages.
- `visual_review_batches.csv`: contact-sheet evidence for human review.

## Generated research layer

- `source_asset_register.csv`: one row per file instance.
- `visual_asset_register.csv`: one row per readable image instance or archive image member.
- `archive_member_register.csv`: one row per archive member.
- `pdf_page_register.csv`: one row per unique PDF page.
- `pdf_page_text.jsonl`: full page text or OCR, with method and restrictions.
- `money_mentions_raw.csv`: unclassified monetary strings for discovery; never use directly as current pricing.

## Status terms

- `observed`: file or value was present in the reviewed source.
- `owner_confirmation_pending`: not approved as current public information.
- `concept_only`: generated or strategic alternative, not owner-approved policy.
- `source_verified_as_snapshot`: accurate only for the captured date.
- `restricted`: intentionally excluded from public text output.
- `reviewed_unique_hash`: every instance is tracked; duplicate pixels were visually reviewed once per hash.
