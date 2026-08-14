#!/usr/bin/env python3
"""Validate research completeness, evidence gates, hashes, and scope."""

from __future__ import annotations

import csv
import hashlib
import json
import subprocess
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
DATA = ROOT / "data" / "research"
FAILURES: list[str] = []


def fail(message: str) -> None:
    FAILURES.append(message)


def csv_rows(path: Path) -> list[dict[str, str]]:
    try:
        with path.open(newline="", encoding="utf-8") as handle:
            rows = list(csv.DictReader(handle))
    except Exception as exc:
        fail(f"CSV unreadable {path.relative_to(ROOT)}: {exc}")
        return []
    for index, row in enumerate(rows, start=2):
        if None in row:
            fail(f"CSV has extra columns {path.relative_to(ROOT)}:{index}: {row[None]}")
    return rows


def digest(path: Path) -> str:
    result = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            result.update(chunk)
    return result.hexdigest()


def require(relative: str) -> Path:
    path = ROOT / relative
    if not path.exists():
        fail(f"required path missing: {relative}")
    return path


def main() -> int:
    required = [
        "AGENTS.md", "README.md", "content/project_context.json", "content/research_status.json",
        "content/service_menu_observations.csv", "content/service_price_evidence.csv",
        "content/product_price_evidence.csv", "content/product_research_evidence.csv",
        "content/conflict_register.csv", "content/relocation_map.csv", "content/visual_review_batches.csv",
        "data/research/source_asset_register.csv", "data/research/visual_asset_register.csv",
        "data/research/archive_member_register.csv", "data/research/pdf_page_register.csv",
        "data/research/pdf_page_text.jsonl", "mcp/server.mjs", "mcp/mcp-config.example.json",
    ]
    for relative in required:
        require(relative)

    context = json.loads((CONTENT / "project_context.json").read_text(encoding="utf-8"))
    status = json.loads((CONTENT / "research_status.json").read_text(encoding="utf-8"))
    if context["project"]["site_implementation_authorized"] is not False:
        fail("project context must block site implementation")
    if status["site_implementation_authorized"] is not False:
        fail("research status must block site implementation")

    sources = csv_rows(DATA / "source_asset_register.csv")
    visuals = csv_rows(DATA / "visual_asset_register.csv")
    archives = csv_rows(DATA / "archive_member_register.csv")
    pages = csv_rows(DATA / "pdf_page_register.csv")
    batches = csv_rows(CONTENT / "visual_review_batches.csv")
    service_evidence = csv_rows(CONTENT / "service_price_evidence.csv")
    service_menu = csv_rows(CONTENT / "service_menu_observations.csv")
    product_prices = csv_rows(CONTENT / "product_price_evidence.csv")
    product_research = csv_rows(CONTENT / "product_research_evidence.csv")
    relocations = csv_rows(CONTENT / "relocation_map.csv")
    conflicts = csv_rows(CONTENT / "conflict_register.csv")

    expected_counts = {
        "source_instances": len(sources),
        "visual_asset_instances": len(visuals),
        "visually_reviewed_instances": sum(row["review_status"].startswith("reviewed") for row in visuals),
        "archive_members": len(archives),
        "pdf_pages": len(pages),
        "service_price_observations": len(service_evidence) + len(service_menu),
        "detailed_service_menu_observations": len(service_menu),
        "product_price_observations": len(product_prices),
        "product_research_observations": len(product_research),
        "relocated_source_matches": len(relocations),
        "unresolved_conflicts": sum(row["status"].startswith("unresolved") for row in conflicts),
    }
    for key, value in expected_counts.items():
        if status["counts"].get(key) != value:
            fail(f"status count mismatch {key}: status={status['counts'].get(key)} actual={value}")

    if len(service_menu) != 36:
        fail(f"detailed service menu must contain 36 observations, found {len(service_menu)}")
    if len(product_prices) != 18:
        fail(f"product price evidence must contain 18 observations, found {len(product_prices)}")
    if len(pages) != 323:
        fail(f"unique PDF page register must contain 323 pages, found {len(pages)}")
    if len(archives) != 1363:
        fail(f"archive member register must contain 1363 members, found {len(archives)}")

    batch_ids = {row["batch_id"] for row in batches}
    for row in batches:
        artifact = ROOT / row["review_artifact"]
        if not artifact.exists():
            fail(f"review artifact missing for {row['batch_id']}: {row['review_artifact']}")
    for row in visuals:
        if not row["review_status"].startswith("reviewed"):
            fail(f"visual not reviewed: {row['source_path']}")
        if row["review_batch"] not in batch_ids:
            fail(f"unknown visual review batch {row['review_batch']}: {row['source_path']}")

    text_rows = []
    with (DATA / "pdf_page_text.jsonl").open(encoding="utf-8") as handle:
        for number, line in enumerate(handle, start=1):
            try:
                text_rows.append(json.loads(line))
            except Exception as exc:
                fail(f"invalid PDF text JSONL line {number}: {exc}")
    page_keys = {(row["pdf_sha256"], int(row["page_number"])) for row in pages}
    text_keys = {(row["pdf_sha256"], int(row["page_number"])) for row in text_rows}
    if page_keys != text_keys:
        fail(f"PDF text/page key mismatch: pages={len(page_keys)} text={len(text_keys)}")
    restricted = [row for row in text_rows if row["extraction_method"] == "restricted"]
    if len(restricted) != 8 or any(row["text"] != "[RESTRICTED: owner formula, costing, and safety research]" for row in restricted):
        fail("restricted product pages are not consistently redacted")

    for row in relocations:
        if not Path(row["located_path"]).exists():
            fail(f"relocated source no longer exists: {row['located_path']}")

    current_img_paths = {str(path.resolve()) for path in (ROOT / "img").iterdir() if path.is_file()}
    registered_paths = {row["source_path"] for row in sources}
    missing_img_paths = sorted(current_img_paths - registered_paths)
    if missing_img_paths:
        fail(f"current repo img files absent from source register: {missing_img_paths}")

    for row in sources:
        canonical = row.get("repo_canonical_path", "")
        if canonical and not (ROOT / canonical).exists():
            fail(f"canonical source missing: {canonical}")
    for row in archives:
        canonical = row.get("repo_canonical_path", "")
        if canonical and not (ROOT / canonical).exists():
            fail(f"canonical archive member missing: {canonical}")

    source_pack = ROOT / "research" / "source-assets"
    for path in source_pack.rglob("*"):
        if not path.is_file():
            continue
        if path.stat().st_size >= 100 * 1024 * 1024:
            fail(f"GitHub-incompatible file size: {path.relative_to(ROOT)}")
        if path.stem != digest(path):
            fail(f"content-addressed hash mismatch: {path.relative_to(ROOT)}")

    allowed_prefixes = ("automation/", "content/", "data/", "docs/", "mcp/", "research/", "schemas/")
    diff = subprocess.run(["git", "diff", "--name-only"], cwd=ROOT, check=True, capture_output=True, text=True).stdout.splitlines()
    for changed in diff:
        if changed not in {"README.md", "AGENTS.md"} and not changed.startswith(allowed_prefixes):
            fail(f"out-of-scope tracked modification: {changed}")
    site_changes = [changed for changed in diff if changed.endswith((".html", ".css", ".js"))]
    if site_changes:
        fail(f"site implementation files changed during research phase: {site_changes}")

    summary = {
        "status": "passed" if not FAILURES else "failed",
        "counts": expected_counts,
        "ocr_methods": dict(Counter(row["extraction_method"] for row in text_rows)),
        "failures": FAILURES,
    }
    print(json.dumps(summary, indent=2))
    return 1 if FAILURES else 0


if __name__ == "__main__":
    raise SystemExit(main())
