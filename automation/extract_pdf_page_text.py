#!/usr/bin/env python3
"""Create a page-complete text/OCR layer for every registered PDF.

The owner formula/costing pages remain redacted in repository outputs. Source
PDFs are read only. OCR renderings exist only in a temporary directory.
"""

from __future__ import annotations

import csv
import json
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
REGISTER = ROOT / "data" / "research" / "pdf_page_register.csv"
OUTPUT = ROOT / "data" / "research" / "pdf_page_text.jsonl"


def clean(value: str) -> str:
    return " ".join(value.replace("\x00", " ").split())


def restricted(source_id: str, source_path: str, page_number: int) -> bool:
    return (
        source_id == "relocated_amber_source"
        and "essential oils structure" in Path(source_path).name.lower()
        and page_number in {19, 20, 21, 22}
    )


def ocr_page(source: Path, page_number: int, temporary: Path) -> str:
    prefix = temporary / f"page-{page_number:04d}"
    subprocess.run(
        [
            "pdftoppm", "-f", str(page_number), "-l", str(page_number),
            "-singlefile", "-png", "-r", "110", str(source), str(prefix),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    result = subprocess.run(
        ["tesseract", str(prefix.with_suffix(".png")), "stdout", "--psm", "6"],
        check=True,
        capture_output=True,
        text=True,
    )
    return clean(result.stdout)


def main() -> int:
    with REGISTER.open(newline="", encoding="utf-8") as handle:
        registered = list(csv.DictReader(handle))
    pdfs: dict[str, dict[str, str]] = {}
    for row in registered:
        pdfs.setdefault(row["pdf_sha256"], row)

    written = 0
    ocr_count = 0
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8") as output:
        for digest, registration in sorted(pdfs.items(), key=lambda item: item[1]["source_path"].lower()):
            source = Path(registration["source_path"])
            reader = PdfReader(str(source))
            page_specs: list[tuple[int, str, bool]] = []
            for page_number, page in enumerate(reader.pages, start=1):
                embedded = ""
                try:
                    embedded = clean(page.extract_text() or "")
                except Exception:
                    embedded = ""
                page_specs.append(
                    (
                        page_number,
                        embedded,
                        restricted(registration["source_id"], str(source), page_number),
                    )
                )
            with tempfile.TemporaryDirectory(prefix="amber-pdf-ocr-") as raw_temporary:
                temporary = Path(raw_temporary)
                def process_page(spec: tuple[int, str, bool]) -> tuple[int, str, str, str, bool]:
                    page_number, embedded, is_restricted = spec
                    if is_restricted:
                        method = "restricted"
                        text = "[RESTRICTED: owner formula, costing, and safety research]"
                        notes = "Public extraction intentionally redacted."
                        used_ocr = False
                    elif len(embedded) >= 40:
                        method = "embedded_text"
                        text = embedded
                        notes = ""
                        used_ocr = False
                    else:
                        try:
                            text = ocr_page(source, page_number, temporary)
                            method = "ocr" if text else "visual_only"
                            notes = "OCR is research aid text and may contain recognition errors."
                            used_ocr = True
                        except Exception as exc:
                            text = embedded
                            method = "visual_only"
                            notes = f"OCR unavailable: {type(exc).__name__}"
                            used_ocr = False
                    return page_number, method, text, notes, used_ocr

                with ThreadPoolExecutor(max_workers=6) as executor:
                    results = list(executor.map(process_page, page_specs))
                for page_number, method, text, notes, used_ocr in results:
                    if used_ocr:
                        ocr_count += 1
                    row = {
                        "pdf_sha256": digest,
                        "source_id": registration["source_id"],
                        "source_path": str(source),
                        "repo_canonical_path": registration.get("repo_canonical_path", ""),
                        "page_number": page_number,
                        "page_count": len(reader.pages),
                        "extraction_method": method,
                        "text_chars": len(text),
                        "text": text,
                        "notes": notes,
                    }
                    output.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")
                    output.flush()
                    written += 1
    print(json.dumps({"pages": written, "ocr_pages": ocr_count, "output": str(OUTPUT.relative_to(ROOT))}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
