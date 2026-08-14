#!/usr/bin/env python3
"""Build Amber's source-backed research registers and canonical source pack.

Inputs are owner-supplied files and the existing repository. Sources are read
only. Exact bytes are copied into a content-addressed research pack so agents
can inspect evidence without relying on the original local folder layout.
"""

from __future__ import annotations

import csv
import hashlib
import io
import json
import mimetypes
import shutil
import subprocess
import zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

from PIL import Image, ImageDraw, ImageFont, ImageOps
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
DATA = ROOT / "data" / "research"
SOURCE_PACK = ROOT / "research" / "source-assets"
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff", ".gif", ".bmp", ".heic", ".heif"}
SKIP_NAMES = {".DS_Store", "__pycache__", "node_modules", ".git"}
MAX_MATERIALIZE_BYTES = 95 * 1024 * 1024


def build_repo_img_review_sheet() -> int:
    """Render a deterministic contact sheet for every readable top-level repo image."""
    items: list[tuple[Path, Image.Image, str]] = []
    for path in sorted((ROOT / "img").iterdir(), key=lambda item: item.name.lower()):
        if not path.is_file():
            continue
        try:
            with Image.open(path) as source:
                preview = ImageOps.contain(source.convert("RGB"), (310, 240), Image.Resampling.LANCZOS)
                dimensions = f"{source.width}x{source.height}"
            items.append((path, preview, dimensions))
        except Exception:
            continue

    columns = 4
    rows = max(1, (len(items) + columns - 1) // columns)
    card_width, card_height = 340, 310
    margin, header = 18, 68
    sheet = Image.new("RGB", (margin * 2 + columns * card_width, header + rows * card_height + margin), "#f7efec")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    draw.text((margin, 18), f"Current repo img assets - {len(items)} readable files", fill="#2c2422", font=font)

    for index, (path, preview, dimensions) in enumerate(items, start=1):
        column = (index - 1) % columns
        row = (index - 1) // columns
        x = margin + column * card_width
        y = header + row * card_height
        card = Image.new("RGB", (320, 248), "#eadeda")
        card.paste(preview, ((320 - preview.width) // 2, (240 - preview.height) // 2 + 4))
        sheet.paste(card, (x, y))
        digest = sha_file(path)[:10]
        draw.text((x + 3, y + 254), f"{index:03d} {path.name}", fill="#2c2422", font=font)
        draw.text((x + 3, y + 270), f"{dimensions} sha {digest}", fill="#2c2422", font=font)

    destination = ROOT / "research" / "review-sheets" / "contact-repo-img.png"
    destination.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(destination, optimize=True)
    return len(items)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def write_csv(path: Path, rows: list[dict[str, Any]], fields: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def sha_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def truth(value: str) -> bool:
    return value.strip().lower() in {"true", "yes", "1"}


def iter_root(path: Path, excluded: set[str]) -> Iterable[Path]:
    if not path.exists() or not path.is_dir():
        return
    for candidate in sorted(path.rglob("*"), key=lambda item: str(item).lower()):
        if not candidate.is_file() or candidate.name in SKIP_NAMES:
            continue
        relative = candidate.relative_to(path)
        relative_parts = relative.parts
        if any(part in SKIP_NAMES for part in relative_parts):
            continue
        relative_text = relative.as_posix()
        if any(relative_text == prefix or relative_text.startswith(f"{prefix.rstrip('/')}/") for prefix in excluded):
            continue
        yield candidate


def image_metadata_from_path(path: Path) -> dict[str, Any]:
    try:
        with Image.open(path) as image:
            return {
                "width": image.width,
                "height": image.height,
                "image_mode": image.mode,
                "has_alpha": image.mode in {"RGBA", "LA", "PA"} or "transparency" in image.info,
                "image_format": image.format or path.suffix.lstrip(".").upper(),
            }
    except Exception:
        if path.suffix.lower() not in {".heic", ".heif"}:
            raise
        result = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
            check=True,
            capture_output=True,
            text=True,
        )
        dimensions: dict[str, int] = {}
        for line in result.stdout.splitlines():
            key, separator, value = line.strip().partition(":")
            if separator and key in {"pixelWidth", "pixelHeight"}:
                dimensions[key] = int(value.strip())
        return {
            "width": dimensions["pixelWidth"],
            "height": dimensions["pixelHeight"],
            "image_mode": "HEIC",
            "has_alpha": False,
            "image_format": "HEIC",
        }


def image_metadata_from_bytes(data: bytes, name: str) -> dict[str, Any]:
    with Image.open(io.BytesIO(data)) as image:
        return {
            "width": image.width,
            "height": image.height,
            "image_mode": image.mode,
            "has_alpha": image.mode in {"RGBA", "LA", "PA"} or "transparency" in image.info,
            "image_format": image.format or Path(name).suffix.lstrip(".").upper(),
        }


def canonical_path(digest: str, suffix: str) -> Path:
    safe_suffix = suffix.lower() if suffix else ".bin"
    return SOURCE_PACK / digest[:2] / f"{digest}{safe_suffix}"


def materialize_file(path: Path, digest: str) -> str:
    destination = canonical_path(digest, path.suffix)
    destination.parent.mkdir(parents=True, exist_ok=True)
    if not destination.exists():
        shutil.copy2(path, destination)
    return destination.relative_to(ROOT).as_posix()


def materialize_bytes(data: bytes, digest: str, suffix: str) -> str:
    destination = canonical_path(digest, suffix)
    destination.parent.mkdir(parents=True, exist_ok=True)
    if not destination.exists():
        destination.write_bytes(data)
    return destination.relative_to(ROOT).as_posix()


def review_batch(source_id: str, path: str) -> str:
    lower = path.lower()
    if source_id == "desktop_amber_source":
        return "desktop_identity_social" if Path(path).suffix.lower() in IMAGE_EXTS else ""
    if source_id in {"approved_logo", "visual_language_board", "dark_floral_reference", "iridescent_lotus_reference", "legacy_amb_mark", "legacy_amber_glyph", "legacy_ambers_glyph", "legacy_logoaet", "legacy_logo4amb"}:
        return "downloads_brand_direction"
    if source_id == "packaging_catalog_reference":
        return "downloads_brand_direction"
    if source_id == "essential_water_archive":
        return "essential_water_archive"
    if source_id == "generated_brand_references":
        return "generated_brand_system"
    if source_id == "sunlit_reference_outputs":
        return "sunlit_direction"
    if source_id == "product_mockup_references":
        return "all_task_generated_images"
    if source_id == "relocated_amber_source":
        return "relocated_amber_archive_visuals" if "::" in path else "relocated_amber_direct_visuals"
    if source_id == "repo_current" and ("/assets/card-" in lower or "/assets/portrait-" in lower):
        return "repo_legacy_fragments"
    if source_id == "repo_current" and "/img/" in lower:
        return "repo_img_assets"
    return ""


def classify_visual(source_id: str, path: str) -> tuple[str, str, str, str, str, str]:
    lower = path.lower()
    name = Path(path).name.lower()
    provenance = "owner_supplied_source"
    approval = "tracked_not_approved"
    usage = "research_only"
    summary = "Image source retained for visual research."
    embedded = "unknown"
    identity = "none_observed"

    if source_id == "approved_logo":
        return "approved_identity", "owner_approved", "approved_logo_reference", "Amber lotus monogram with A monogram and droplet; warm metallic gradient on light field.", "brand_text_present", "brand_identity"
    if source_id == "repo_current" and "/assets/card-" in lower:
        return "legacy_export_fragment", "not_approved_as_standalone", "not_consumed", "Legacy cropped layer mask text remnant or export fragment from prior card artwork.", "fragment_may_include_text", "none_observed"
    if source_id == "repo_current" and "/assets/portrait-" in lower:
        return "legacy_export_fragment", "not_approved_as_standalone", "not_consumed", "Legacy portrait export fragment retained for provenance.", "unknown", "may_include_person"
    if source_id == "repo_current" and "/img/treat-" in lower:
        return "service_card_crop", "source_specific_not_final_tone", "current_repo_reference", "Text-free dark botanical crop used as a service-card image.", "no_baked_text", "none_observed"
    if source_id == "repo_current" and name == "amber-portrait-3.jpg":
        return "owner_supplied_portrait", "identity_source", "identity_reference", "Current repository portrait of Amber; visually matched to the supplied dated owner portrait and retained as identity evidence.", "date_stamp_present", "amber"
    if source_id == "repo_current" and name == "logo-mark.png":
        return "approved_identity", "owner_approved", "approved_logo_reference", "Amber's approved lotus A monogram and droplet with the full Amber's Essential Touch wordmark.", "approved_brand_text_present", "brand_identity"
    if source_id == "repo_current" and name == "logo-glyph.png":
        return "legacy_identity_reference", "historical_not_current", "research_only", "Celestial lotus glyph retained as a distinct historical identity direction; it is not the approved Amber monogram.", "no_baked_text", "brand_identity"
    if source_id == "product_mockup_references":
        provenance, usage, embedded = "generated_product_concept", "future_product_research", "generated_label_text_present"
        summary = "Generated product or campaign concept retained for product research; photography and label approval are separate."
        if "df3abc32" in lower:
            approval, usage, summary = "explicitly_rejected", "do_not_publish", "Dark industrial product-family group explicitly rejected by the owner; preserved only as rejection evidence."
        elif name.startswith(("exec-0fddea1b", "exec-5a22a339", "exec-85f96baf", "exec-3b0c8770", "exec-dd128f61", "exec-549b4d08", "exec-57acfd4c", "exec-361cef96")):
            approval = "development_reference_not_label_approval"
        if name.startswith(("exec-267496f0", "exec-f6f8a6a1", "exec-e7ee175c0", "exec-d70ca01a")):
            identity = "generated_person_not_verified"
        return provenance, approval, usage, summary, embedded, identity
    if source_id == "sunlit_reference_outputs":
        provenance, approval, usage = "generated_art_direction", "owner_directed_reference", "current_art_direction_reference"
        summary = "Warm sunlight flowers moisture refraction and gradient reference; no products in site hero imagery."
        embedded = "no_baked_text"
        identity = "generated_person_not_verified" if "lived_skin" in lower else "none_observed"
        return provenance, approval, usage, summary, embedded, identity
    if source_id == "generated_brand_references":
        return "generated_design_reference", "tracked_not_approved", "research_only", "Generated hero component atlas or design-system reference retained for comparison.", "varies_by_asset", "generated_or_none"
    if source_id == "dark_floral_reference":
        return "owner_supplied_art_direction", "superseded_tone_reference", "source_for_legacy_service_crops", "Dark burgundy black botanical still life with moisture and glass props.", "no_baked_text", "none_observed"
    if source_id == "iridescent_lotus_reference":
        return "owner_supplied_art_direction", "reference", "refraction_material_reference", "Translucent iridescent lotus with prism illumination on a dark field.", "no_baked_text", "none_observed"
    if source_id == "visual_language_board":
        return "generated_design_board", "tracked_not_approved", "research_only", "Composite visual-language board with Amber portrait brand palette typography UI examples and product mockups.", "substantial_baked_text", "amber_portrait_composite"
    if source_id == "desktop_amber_source":
        if "652197495" in name or "672161857" in name:
            return "owner_supplied_portrait", "identity_source", "identity_reference", "Photograph of Amber used as identity and hand-reference evidence.", "date_stamp_on_one_source", "amber"
        if name in {"img_2884.png", "img_2885.png", "img_2887.png"}:
            return "social_capture", "source_evidence", "copy_and_business_research", "Instagram screenshot containing prior Amber content or practitioner imagery.", "substantial_baked_text_or_ui", "amber_or_social_subject"
        if name in {"1.png", "2.png"}:
            return "prior_social_graphic", "source_evidence", "copy_research", "Prior Amber copy graphic with hand motif gradients floral motifs and legacy wordmark.", "substantial_baked_text", "illustrated_hands"
        if "firefly" in name:
            return "generated_identity_reference", "historical_not_current", "research_only", "Regal queen illustration retained as a historical identity direction.", "no_baked_text", "generated_person"
        if "lotus" in name:
            return "legacy_identity_reference", "historical_not_current", "research_only", "Celestial lotus emblem retained as a historical identity direction.", "no_baked_text", "brand_identity"
    if source_id == "essential_water_archive":
        return "owner_supplied_archive_reference", "research_reference", "future_product_research", "Warm lotus pomegranate amber-bottle still life or related lotus asset from the supplied archive.", "no_baked_text", "none_observed"
    if source_id == "relocated_amber_source":
        if "::" in path:
            return "owner_supplied_archive_member", "source_evidence", "research_only", "Image member from a relocated owner-supplied website service-card or portfolio archive.", "varies_by_asset", "amber_or_generated_or_none"
        return "owner_supplied_relocated_visual", "source_evidence", "research_only", "Direct image from the relocated owner source package; retained for identity service product and art-direction research.", "varies_by_asset", "amber_or_client_or_generated_or_none"
    if name.endswith("bottles.png"):
        return "packaging_catalog_reference", "research_reference", "future_product_research", "Product family catalog sheet of rounded jars vessels bottles lids and applicators.", "technical_text_present", "none_observed"
    return provenance, approval, usage, summary, embedded, identity


def collect_sources() -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:
    roots = read_csv(CONTENT / "source_roots.csv")
    explicit = read_csv(CONTENT / "source_files.csv")
    prior_instances = read_csv(DATA / "source_asset_register.csv") if (DATA / "source_asset_register.csv").exists() else []
    prior_visuals = read_csv(DATA / "visual_asset_register.csv") if (DATA / "visual_asset_register.csv").exists() else []
    instances: list[dict[str, Any]] = []
    visuals: list[dict[str, Any]] = []
    archive_members: list[dict[str, Any]] = []

    candidates: list[tuple[str, Path, str, bool, str, str]] = []
    for row in roots:
        path = ROOT if row["absolute_path"] == "." else Path(row["absolute_path"])
        excluded = {item for item in row.get("exclude_prefixes", "").split("|") if item}
        if path.exists():
            for file_path in iter_root(path, excluded):
                candidates.append((row["source_id"], file_path, row["scope"], truth(row["materialize"]), row["authority"], "observed"))
        else:
            instances.append({
                "instance_id": f"src_{len(instances)+1:06d}", "source_id": row["source_id"], "source_path": str(path),
                "relative_path": "", "status": "not_located", "scope": row["scope"], "authority": row["authority"],
                "bytes": "", "sha256": "", "mime_type": "", "repo_canonical_path": "", "duplicate_group": "", "notes": row["notes"],
            })
    for row in explicit:
        path = Path(row["absolute_path"])
        status = "observed" if path.exists() else row["status"]
        if path.exists() and path.is_file():
            candidates.append((row["source_id"], path, row["scope"], truth(row["materialize"]), row["authority"], status))
        else:
            instances.append({
                "instance_id": f"src_{len(instances)+1:06d}", "source_id": row["source_id"], "source_path": str(path),
                "relative_path": "", "status": status, "scope": row["scope"], "authority": row["authority"],
                "bytes": "", "sha256": "", "mime_type": "", "repo_canonical_path": "", "duplicate_group": "", "notes": row["notes"],
            })

    seen_instances: set[tuple[str, str]] = set()
    for source_id, path, scope, do_materialize, authority, status in candidates:
        identity = (source_id, str(path))
        if identity in seen_instances:
            continue
        seen_instances.add(identity)
        try:
            digest = sha_file(path)
            size = path.stat().st_size
            mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
            materialize_note = ""
            if do_materialize and size <= MAX_MATERIALIZE_BYTES:
                repo_path = materialize_file(path, digest)
            elif do_materialize:
                repo_path = ""
                materialize_note = f"Exact source exceeds the {MAX_MATERIALIZE_BYTES}-byte repository materialization cap; hash and metadata retained."
            else:
                repo_path = path.relative_to(ROOT).as_posix() if path.is_relative_to(ROOT) else ""
            root_path = ROOT if source_id == "repo_current" else next((Path(row["absolute_path"]) for row in roots if row["source_id"] == source_id), path.parent)
            try:
                relative = path.relative_to(root_path).as_posix()
            except ValueError:
                relative = path.name
            instance = {
                "instance_id": f"src_{len(instances)+1:06d}", "source_id": source_id, "source_path": str(path),
                "relative_path": relative, "status": status, "scope": scope, "authority": authority, "bytes": size,
                "sha256": digest, "mime_type": mime, "repo_canonical_path": repo_path, "duplicate_group": "", "notes": materialize_note,
            }
            instances.append(instance)
            if path.suffix.lower() in IMAGE_EXTS:
                try:
                    metadata = image_metadata_from_path(path)
                    provenance, approval, usage, summary, embedded, sensitivity = classify_visual(source_id, str(path))
                    visuals.append({
                        "asset_instance_id": f"vis_{len(visuals)+1:06d}", "source_instance_id": instance["instance_id"],
                        "source_id": source_id, "source_path": str(path), "relative_path": relative,
                        "repo_canonical_path": repo_path, "sha256": digest, "duplicate_group": "", "bytes": size,
                        **metadata, "provenance_class": provenance, "review_batch": review_batch(source_id, str(path)),
                        "review_status": "reviewed" if review_batch(source_id, str(path)) else "metadata_only",
                        "approval_status": approval, "usage_status": usage, "content_summary": summary,
                        "embedded_text_status": embedded, "identity_sensitivity": sensitivity, "notes": "",
                    })
                except Exception as exc:
                    instance["notes"] = f"image metadata error: {type(exc).__name__}: {exc}"
            if path.suffix.lower() == ".zip":
                with zipfile.ZipFile(path) as archive:
                    for member in archive.infolist():
                        if member.is_dir():
                            continue
                        data = archive.read(member)
                        member_digest = sha_bytes(data)
                        suffix = Path(member.filename).suffix
                        member_repo_path = materialize_bytes(data, member_digest, suffix) if do_materialize and len(data) <= MAX_MATERIALIZE_BYTES else ""
                        member_mime = mimetypes.guess_type(member.filename)[0] or "application/octet-stream"
                        member_row = {
                            "archive_member_id": f"arc_{len(archive_members)+1:06d}", "archive_source_id": source_id,
                            "archive_path": str(path), "archive_sha256": digest, "member_path": member.filename,
                            "uncompressed_bytes": len(data), "compressed_bytes": member.compress_size, "crc": member.CRC,
                            "sha256": member_digest, "mime_type": member_mime, "repo_canonical_path": member_repo_path,
                            "status": "observed", "notes": "" if member_repo_path or not do_materialize else f"Archive member exceeds the {MAX_MATERIALIZE_BYTES}-byte repository materialization cap; hash and metadata retained.",
                        }
                        archive_members.append(member_row)
                        if suffix.lower() in IMAGE_EXTS:
                            try:
                                metadata = image_metadata_from_bytes(data, member.filename)
                                archive_visual_path = f"{path}::{member.filename}"
                                provenance, approval, usage, summary, embedded, sensitivity = classify_visual(source_id, archive_visual_path)
                                visuals.append({
                                    "asset_instance_id": f"vis_{len(visuals)+1:06d}", "source_instance_id": member_row["archive_member_id"],
                                    "source_id": source_id, "source_path": f"{path}::{member.filename}", "relative_path": member.filename,
                                    "repo_canonical_path": member_repo_path, "sha256": member_digest, "duplicate_group": "",
                                    "bytes": len(data), **metadata, "provenance_class": provenance,
                                    "review_batch": review_batch(source_id, archive_visual_path), "review_status": "reviewed",
                                    "approval_status": approval, "usage_status": usage, "content_summary": summary,
                                    "embedded_text_status": embedded, "identity_sensitivity": sensitivity, "notes": "archive member",
                                })
                            except Exception as exc:
                                member_row["notes"] = f"image metadata error: {type(exc).__name__}: {exc}"
        except Exception as exc:
            instances.append({
                "instance_id": f"src_{len(instances)+1:06d}", "source_id": source_id, "source_path": str(path),
                "relative_path": path.name, "status": "unreadable", "scope": scope, "authority": authority,
                "bytes": "", "sha256": "", "mime_type": "", "repo_canonical_path": "", "duplicate_group": "",
                "notes": f"{type(exc).__name__}: {exc}",
            })

    # A live external source folder may be cleaned up after intake. Never let a
    # later rebuild erase an already tracked source whose exact bytes are still
    # present in the repository's content-addressed source pack.
    current_source_keys = {(row["source_id"], row["source_path"]) for row in instances}
    retained_source_ids: dict[tuple[str, str], str] = {}
    for prior in prior_instances:
        key = (prior.get("source_id", ""), prior.get("source_path", ""))
        canonical = prior.get("repo_canonical_path", "")
        if key in current_source_keys or not canonical or not (ROOT / canonical).exists():
            continue
        retained = dict(prior)
        retained["instance_id"] = f"src_{len(instances)+1:06d}"
        retained["status"] = "retained_from_prior_snapshot_source_now_missing"
        retained["notes"] = "Exact bytes retained in the content-addressed source pack; the previously observed live source path is no longer present."
        instances.append(retained)
        retained_source_ids[key] = retained["instance_id"]
        current_source_keys.add(key)

    current_visual_keys = {(row["source_id"], row["source_path"]) for row in visuals}
    for prior in prior_visuals:
        key = (prior.get("source_id", ""), prior.get("source_path", ""))
        canonical = prior.get("repo_canonical_path", "")
        if key in current_visual_keys or key not in retained_source_ids or not canonical or not (ROOT / canonical).exists():
            continue
        retained = dict(prior)
        retained["asset_instance_id"] = f"vis_{len(visuals)+1:06d}"
        retained["source_instance_id"] = retained_source_ids[key]
        retained["notes"] = "Exact visual retained from the prior snapshot; live source path is now missing."
        visuals.append(retained)
        current_visual_keys.add(key)

    counts = Counter(row["sha256"] for row in instances if row.get("sha256"))
    for row in instances:
        digest = row.get("sha256", "")
        row["duplicate_group"] = digest[:16] if digest and counts[digest] > 1 else ""
    visual_counts = Counter(row["sha256"] for row in visuals if row.get("sha256"))
    for row in visuals:
        digest = row.get("sha256", "")
        row["duplicate_group"] = digest[:16] if digest and visual_counts[digest] > 1 else ""
    return instances, visuals, archive_members


def pdf_page_register(instances: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    seen: set[str] = set()
    for instance in instances:
        path = Path(instance.get("source_path", ""))
        digest = instance.get("sha256", "")
        if not digest or digest in seen or path.suffix.lower() not in {".pdf", ".ai"} or not path.exists():
            continue
        try:
            reader = PdfReader(str(path))
        except Exception:
            continue
        seen.add(digest)
        source_id = instance["source_id"]
        if source_id == "aeve_moodboard_pdf":
            batch = "aeve_moodboard_pages"
        elif source_id == "aeve_production_register":
            batch = "aeve_register_pages"
        elif source_id == "aeve_storyboard":
            batch = "aeve_storyboard_pages"
        elif "birdeye" in path.name.lower():
            batch = "birdeye_pdf_pages"
        elif source_id == "relocated_amber_source" and "essential oils structure" in path.name.lower():
            batch = "relocated_product_structure_pages"
        elif source_id == "relocated_amber_source" and path.name.lower() == "img_1188.pdf":
            batch = "relocated_img1188_pages"
        elif source_id == "relocated_amber_source":
            batch = "relocated_business_design_pages"
        elif path.name.lower() in {"ambers resume.pdf", "ambers-essential-touch-flyer.pdf", "busniess card.pdf", "portrait.pdf"}:
            batch = "business_pdf_pages"
        else:
            batch = "creative_pdf_pages" if source_id == "desktop_amber_source" else ""
        for index, page in enumerate(reader.pages, start=1):
            try:
                text = " ".join((page.extract_text() or "").split())
            except Exception:
                text = ""
            page_type = "text_dominant" if len(text) > 700 else "mixed" if len(text) > 80 else "visual_dominant"
            restricted = (
                source_id == "relocated_amber_source"
                and "essential oils structure" in path.name.lower()
                and index in {19, 20, 21, 22}
            )
            rows.append({
                "pdf_page_id": f"pdf_{len(rows)+1:04d}", "source_id": source_id, "source_path": str(path),
                "repo_canonical_path": instance.get("repo_canonical_path", ""), "pdf_sha256": digest,
                "page_number": index, "page_count": len(reader.pages), "page_type": page_type,
                "text_chars": len(text),
                "text_excerpt": "[RESTRICTED: owner formula, costing, and safety research]" if restricted else text[:360],
                "visual_review_batch": batch,
                "visual_review_status": "reviewed" if batch else "metadata_only",
                "notes": "Public extraction redacted; consult the controlled owner source only with explicit authorization." if restricted else "",
            })
    return rows


def raw_money_mentions(instances: list[dict[str, Any]]) -> list[dict[str, Any]]:
    import re
    pattern = re.compile(r"(?i)(?:from\s+)?\$\s?\d+(?:\.\d{2})?(?:\s*/\s*mo)?")
    rows: list[dict[str, Any]] = []
    seen: set[str] = set()
    for instance in instances:
        path = Path(instance.get("source_path", ""))
        digest = instance.get("sha256", "")
        if not digest or digest in seen or path.suffix.lower() not in {".md", ".txt", ".html", ".js", ".json", ".csv"} or not path.exists():
            continue
        seen.add(digest)
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        lines = text.splitlines()
        for line_number, line in enumerate(lines, start=1):
            for match in pattern.finditer(line):
                rows.append({
                    "mention_id": f"money_{len(rows)+1:05d}", "source_id": instance["source_id"],
                    "source_path": str(path), "line_number": line_number, "raw_amount": match.group(0),
                    "line_excerpt": line.strip()[:420], "classification": "unclassified_raw_mention",
                })
    return rows


def count_csv(path: Path) -> int:
    return len(read_csv(path))


def main() -> int:
    DATA.mkdir(parents=True, exist_ok=True)
    SOURCE_PACK.mkdir(parents=True, exist_ok=True)
    build_repo_img_review_sheet()
    instances, visuals, archive_members = collect_sources()
    pages = pdf_page_register(instances)
    money = raw_money_mentions(instances)

    write_csv(DATA / "source_asset_register.csv", instances, [
        "instance_id", "source_id", "source_path", "relative_path", "status", "scope", "authority", "bytes",
        "sha256", "mime_type", "repo_canonical_path", "duplicate_group", "notes",
    ])
    write_csv(DATA / "visual_asset_register.csv", visuals, [
        "asset_instance_id", "source_instance_id", "source_id", "source_path", "relative_path", "repo_canonical_path",
        "sha256", "duplicate_group", "bytes", "image_format", "width", "height", "image_mode", "has_alpha",
        "provenance_class", "review_batch", "review_status", "approval_status", "usage_status", "content_summary",
        "embedded_text_status", "identity_sensitivity", "notes",
    ])
    write_csv(DATA / "archive_member_register.csv", archive_members, [
        "archive_member_id", "archive_source_id", "archive_path", "archive_sha256", "member_path", "uncompressed_bytes",
        "compressed_bytes", "crc", "sha256", "mime_type", "repo_canonical_path", "status", "notes",
    ])
    write_csv(DATA / "pdf_page_register.csv", pages, [
        "pdf_page_id", "source_id", "source_path", "repo_canonical_path", "pdf_sha256", "page_number", "page_count",
        "page_type", "text_chars", "text_excerpt", "visual_review_batch", "visual_review_status", "notes",
    ])
    write_csv(DATA / "money_mentions_raw.csv", money, [
        "mention_id", "source_id", "source_path", "line_number", "raw_amount", "line_excerpt", "classification",
    ])

    reviewed_visuals = sum(row["review_status"].startswith("reviewed") for row in visuals)
    source_missing = sum(row["status"].startswith("not_located") for row in instances)
    unresolved_conflicts = sum(row["status"].startswith("unresolved") for row in read_csv(CONTENT / "conflict_register.csv"))
    relocated_sources = count_csv(CONTENT / "relocation_map.csv")
    status = {
        "schema_version": "1.0",
        "generated_at": utc_now(),
        "phase": "research_and_source_reconstruction",
        "site_implementation_authorized": False,
        "research_complete": False,
        "counts": {
            "source_instances": len(instances), "visual_asset_instances": len(visuals),
            "visually_reviewed_instances": reviewed_visuals, "archive_members": len(archive_members),
            "pdf_pages": len(pages), "raw_money_mentions": len(money), "missing_named_sources": source_missing,
            "service_price_observations": count_csv(CONTENT / "service_price_evidence.csv") + count_csv(CONTENT / "service_menu_observations.csv"),
            "detailed_service_menu_observations": count_csv(CONTENT / "service_menu_observations.csv"),
            "product_price_observations": count_csv(CONTENT / "product_price_evidence.csv"),
            "product_research_observations": count_csv(CONTENT / "product_research_evidence.csv"),
            "relocated_source_matches": relocated_sources,
            "unresolved_conflicts": unresolved_conflicts,
        },
        "gates": [
            {"gate": "source_intake", "status": "complete", "evidence": "data/research/source_asset_register.csv"},
            {"gate": "relocated_source_recovery", "status": "complete", "evidence": "content/relocation_map.csv and data/intake/relocated_source"},
            {"gate": "visual_tracking", "status": "complete", "evidence": "data/research/visual_asset_register.csv and research/review-sheets"},
            {"gate": "service_price_extraction", "status": "complete", "evidence": "content/service_price_evidence.csv"},
            {"gate": "product_price_extraction", "status": "complete", "evidence": "content/product_price_evidence.csv"},
            {
                "gate": "owner_conflict_resolution",
                "status": "complete" if unresolved_conflicts == 0 else "pending",
                "evidence": "content/conflict_register.csv",
            },
            {"gate": "source_rights_and_client_consent", "status": "pending", "evidence": "visual_asset_register identity_sensitivity fields"},
            {"gate": "research_signoff", "status": "pending", "evidence": "owner approval required"},
            {"gate": "site_build", "status": "blocked_by_research_gate", "evidence": "AGENTS.md"},
        ],
    }
    (CONTENT / "research_status.json").write_text(json.dumps(status, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(status, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
