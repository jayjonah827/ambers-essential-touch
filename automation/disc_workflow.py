#!/usr/bin/env python3
"""Raw-first, read-only source intake for Amber's Essential Touch.

The script never alters scanned sources. It writes one raw JSONL event per
observed or expected path before it derives the normalized CSV register.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import mimetypes
import os
import stat
import zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

try:
    from PIL import Image, ExifTags
except Exception:  # optional enrichment only
    Image = None
    ExifTags = None

try:
    from pypdf import PdfReader
except Exception:  # optional enrichment only
    PdfReader = None


SCHEMA_VERSION = "1.0"
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".DS_Store"}
REGISTER_FIELDS = [
    "event_id", "schema_version", "run_id", "source_id", "source_root",
    "absolute_path", "relative_path", "filename", "extension", "path_type",
    "status", "detection_reason", "mime_type", "bytes", "sha256", "created_at",
    "modified_at", "width", "height", "image_mode", "has_alpha", "exif_datetime",
    "pdf_pages", "pdf_title", "pdf_author", "pdf_subject", "pdf_text_chars",
    "archive_member_count", "duplicate_group", "classification_branch", "error",
]


def utc_iso(value: float | None = None) -> str:
    moment = datetime.fromtimestamp(value, tz=timezone.utc) if value else datetime.now(timezone.utc)
    return moment.replace(microsecond=0).isoformat()


def parse_named_path(value: str) -> tuple[str, Path]:
    if "=" not in value:
        raise argparse.ArgumentTypeError("Use NAME=/absolute/path")
    name, raw_path = value.split("=", 1)
    if not name.strip() or not raw_path.strip():
        raise argparse.ArgumentTypeError("Both NAME and path are required")
    return name.strip(), Path(raw_path).expanduser()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def classify_branch(path: Path, mime: str) -> str:
    suffix = path.suffix.lower()
    if mime.startswith("image/"):
        return "image_metadata"
    if suffix == ".pdf":
        return "pdf_metadata"
    if suffix in {".zip", ".tar", ".gz", ".tgz"}:
        return "archive_metadata"
    if suffix in {".csv", ".json", ".jsonl", ".xlsx", ".xls"}:
        return "structured_data"
    if suffix in {".html", ".css", ".js", ".mjs", ".ts", ".tsx", ".jsx"}:
        return "web_source"
    if suffix in {".md", ".txt", ".rtf", ".doc", ".docx"}:
        return "text_source"
    if suffix in {".ai", ".psd", ".afdesign", ".fig", ".svg", ".eps"}:
        return "design_source"
    return "file_metadata"


def base_event(run_id: str, source_id: str, root: Path, path: Path, reason: str) -> dict[str, Any]:
    absolute = path.absolute()
    try:
        relative = str(absolute.relative_to(root.absolute()))
    except ValueError:
        relative = absolute.name
    return {
        "schema_version": SCHEMA_VERSION,
        "run_id": run_id,
        "source_id": source_id,
        "source_root": str(root.absolute()),
        "absolute_path": str(absolute),
        "relative_path": relative or ".",
        "filename": absolute.name,
        "extension": absolute.suffix.lower(),
        "detection_reason": reason,
        "recorded_at": utc_iso(),
    }


def enrich_file(event: dict[str, Any], path: Path) -> dict[str, Any]:
    result = dict(event)
    result.update({
        "path_type": "file", "status": "observed", "mime_type": "",
        "bytes": "", "sha256": "", "created_at": "", "modified_at": "",
        "width": "", "height": "", "image_mode": "", "has_alpha": "",
        "exif_datetime": "", "pdf_pages": "", "pdf_title": "",
        "pdf_author": "", "pdf_subject": "", "pdf_text_chars": "",
        "archive_member_count": "", "classification_branch": "file_metadata",
        "error": "",
    })
    try:
        info = path.lstat()
        result["bytes"] = info.st_size
        result["created_at"] = utc_iso(info.st_ctime)
        result["modified_at"] = utc_iso(info.st_mtime)
        mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        result["mime_type"] = mime
        result["classification_branch"] = classify_branch(path, mime)
        result["sha256"] = sha256_file(path)

        if Image and mime.startswith("image/"):
            with Image.open(path) as image:
                result["width"], result["height"] = image.size
                result["image_mode"] = image.mode
                result["has_alpha"] = image.mode in {"RGBA", "LA", "PA"} or "transparency" in image.info
                try:
                    exif = image.getexif()
                    tag_map = {v: k for k, v in ExifTags.TAGS.items()} if ExifTags else {}
                    result["exif_datetime"] = str(exif.get(tag_map.get("DateTimeOriginal"), ""))
                except Exception:
                    pass

        if PdfReader and path.suffix.lower() == ".pdf":
            reader = PdfReader(str(path))
            result["pdf_pages"] = len(reader.pages)
            metadata = reader.metadata or {}
            result["pdf_title"] = str(metadata.get("/Title", "") or "")
            result["pdf_author"] = str(metadata.get("/Author", "") or "")
            result["pdf_subject"] = str(metadata.get("/Subject", "") or "")
            chars = 0
            for page in reader.pages:
                try:
                    chars += len(page.extract_text() or "")
                except Exception:
                    continue
            result["pdf_text_chars"] = chars

        if path.suffix.lower() == ".zip":
            with zipfile.ZipFile(path) as archive:
                result["archive_member_count"] = len(archive.infolist())
    except Exception as exc:
        result["status"] = "unreadable"
        result["error"] = f"{type(exc).__name__}: {exc}"
    return result


def iter_source(
    run_id: str,
    source_id: str,
    root: Path,
    excluded_relatives: tuple[str, ...] = (),
) -> Iterable[dict[str, Any]]:
    if not root.exists():
        event = base_event(run_id, source_id, root, root, "configured_source_root")
        event.update({"path_type": "missing", "status": "not_located", "classification_branch": "absence"})
        yield event
        return
    if root.is_file():
        yield enrich_file(base_event(run_id, source_id, root.parent, root, "configured_source_file"), root)
        return
    if root.is_symlink():
        event = base_event(run_id, source_id, root, root, "configured_source_symlink")
        event.update({"path_type": "symlink", "status": "skipped", "classification_branch": "metadata_only"})
        yield event
        return

    root_event = base_event(run_id, source_id, root, root, "configured_source_root")
    root_event.update({"path_type": "directory", "status": "observed", "classification_branch": "root_metadata"})
    yield root_event
    for current, directories, filenames in os.walk(root, topdown=True, followlinks=False):
        current_path = Path(current)
        directories[:] = sorted(
            directory
            for directory in directories
            if directory not in SKIP_DIRS
            and not any(
                str((current_path / directory).relative_to(root)).startswith(prefix)
                for prefix in excluded_relatives
            )
        )
        for filename in sorted(filenames):
            if filename == ".DS_Store":
                continue
            path = Path(current) / filename
            if path.is_symlink():
                event = base_event(run_id, source_id, root, path, "recursive_discovery")
                event.update({"path_type": "symlink", "status": "skipped", "classification_branch": "metadata_only"})
                yield event
            elif path.is_file():
                yield enrich_file(base_event(run_id, source_id, root, path, "recursive_discovery"), path)


def expected_event(run_id: str, source_id: str, path: Path) -> dict[str, Any]:
    if path.exists():
        if path.is_file():
            return enrich_file(base_event(run_id, source_id, path.parent, path, "explicit_expected_path"), path)
        event = base_event(run_id, source_id, path, path, "explicit_expected_path")
        event.update({"path_type": "directory", "status": "observed", "classification_branch": "expected_metadata"})
        return event
    event = base_event(run_id, source_id, path.parent, path, "explicit_expected_path")
    event.update({"path_type": "missing", "status": "not_located", "classification_branch": "absence"})
    return event


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", action="append", default=[], type=parse_named_path)
    parser.add_argument("--expected", action="append", default=[], type=parse_named_path)
    parser.add_argument(
        "--exclude",
        action="append",
        default=[],
        type=parse_named_path,
        help="Skip a source-relative subtree using SOURCE_ID=relative/path",
    )
    parser.add_argument("--output-dir", default="data/intake")
    parser.add_argument("--run-id", default=datetime.now().strftime("%Y%m%dT%H%M%S"))
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    raw_dir = output_dir / "events_raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    raw_path = raw_dir / f"disc_intake_{args.run_id}.jsonl"

    events: list[dict[str, Any]] = []
    with raw_path.open("w", encoding="utf-8") as raw_handle:
        exclusions: dict[str, tuple[str, ...]] = {}
        for exclude_source, relative_path in args.exclude:
            exclusions.setdefault(exclude_source, tuple())
            exclusions[exclude_source] = exclusions[exclude_source] + (str(relative_path),)
        for source_id, path in args.source:
            for event in iter_source(args.run_id, source_id, path, exclusions.get(source_id, ())):
                event["event_id"] = f"evt_{len(events) + 1:06d}"
                raw_handle.write(json.dumps(event, ensure_ascii=False, sort_keys=True) + "\n")
                raw_handle.flush()
                events.append(event)
        for source_id, path in args.expected:
            event = expected_event(args.run_id, source_id, path)
            event["event_id"] = f"evt_{len(events) + 1:06d}"
            raw_handle.write(json.dumps(event, ensure_ascii=False, sort_keys=True) + "\n")
            raw_handle.flush()
            events.append(event)

    hashes = Counter(str(event.get("sha256", "")) for event in events if event.get("sha256"))
    for event in events:
        digest = str(event.get("sha256", ""))
        event["duplicate_group"] = digest[:16] if digest and hashes[digest] > 1 else ""

    register_path = output_dir / "source_register.csv"
    with register_path.open("w", encoding="utf-8", newline="") as csv_handle:
        writer = csv.DictWriter(csv_handle, fieldnames=REGISTER_FIELDS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(events)

    summary = {
        "schema_version": SCHEMA_VERSION,
        "run_id": args.run_id,
        "generated_at": utc_iso(),
        "raw_events_path": str(raw_path),
        "source_register_path": str(register_path),
        "event_count": len(events),
        "file_count": sum(1 for event in events if event.get("path_type") == "file"),
        "not_located_count": sum(1 for event in events if event.get("status") == "not_located"),
        "unreadable_count": sum(1 for event in events if event.get("status") == "unreadable"),
        "duplicate_file_count": sum(1 for event in events if event.get("duplicate_group")),
        "source_counts": dict(Counter(str(event.get("source_id", "")) for event in events)),
        "status_counts": dict(Counter(str(event.get("status", "")) for event in events)),
        "branch_counts": dict(Counter(str(event.get("classification_branch", "")) for event in events)),
    }
    summary_path = output_dir / "intake_summary.json"
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
