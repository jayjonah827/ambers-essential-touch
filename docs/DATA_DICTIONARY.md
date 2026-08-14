# Data dictionary

## Content layer

- `business_fact_evidence.csv`: one factual observation per source, with temporal and publication rules.
- `competitor_reference_index.csv`: page-range analysis of the supplied reference PDF; observational, not independently verified market research.
- `conflict_register.csv`: contradictory or superseded observations and required resolution.
- `copy_evidence.csv`: exact phrases, voice status, risk, and usage rule.
- `design_direction_evidence.csv`: owner and source art direction separated by scope and priority.
- `product_catalog_candidates.csv`: repeated existing working models separated from optional and generated concepts; it is not a production inventory system.
- `product_price_evidence.csv`: every extracted product-price observation, with generated relaunch alternatives explicitly excluded from the usable candidate set.
- `product_research_evidence.csv`: formula, usage, safety, claim, and confidentiality boundaries.
- `relocation_map.csv`: original path to recovered path mapping.
- `research_topic_index.csv`: source and page-range routing.
- `service_catalog.csv`: summarized grouped model from generated specifications and older-site snapshots; it cannot override the detailed menu or describe the current site.
- `service_menu_observations.csv`: exact 36-line detailed uploaded menu and working canonical service-price source.
- `service_price_evidence.csv`: grouped generated-specification and older-site observations retained as historical research.
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
- `working_canonical_by_source_priority`: current working authority selected from the strongest available first-party operating evidence.
- `generated_specification_not_canonical`: generated planning value retained as research, not operating evidence.
- `older_site_snapshot_not_canonical`: value observed in a preexisting site snapshot, not evidence of the current site or current operating price.
- `excluded_generated_concept`: retained for provenance but not a usable business option.
- `retained_from_prior_snapshot_source_now_missing`: exact bytes remain in the repository source pack even though the previously observed external path has disappeared.
- `source_verified_as_snapshot`: accurate only for the captured date.
- `restricted`: intentionally excluded from public text output.
- `reviewed_unique_hash`: every instance is tracked; duplicate pixels were visually reviewed once per hash.
