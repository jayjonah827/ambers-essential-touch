# AMBER'S ESSENTIAL TOUCH — DESIGN SYSTEM PLAN

**File 08 of the build-out bundle.** Slots after `04_FIGMA_BRIEF.md`, before `06_WIX_BUILD_GUIDE.md`.
**Target:** code tokens only — `design-tokens.json` (W3C DTCG) + `tokens.css` custom properties + component CSS + a living docs page. No Figma dependency.
**Status:** plan, not yet executed. Every phase below carries a copy-paste-ready prompt.
**Generated:** 2026-07-31 from Google Drive sources listed in §1.

---

## 0. One-sentence scope

Turn the loose token list in `04_FIGMA_BRIEF.md` into a versioned, machine-readable design system — primitives → semantics → components — that renders identically in a Wix embed today and a custom build later, and that fails loudly when a color, size, or contrast rule is broken.

---

## 1. Source ledger — what already exists

Everything below is real and already in Drive. Nothing in this plan invents brand facts.

| # | File | Drive location | What the design system takes from it |
|---|---|---|---|
| 00 | `00_START_HERE.md` | [ambers essential touch, the build out](https://drive.google.com/file/d/15EPYaNrf5M7glyNWCXN4GAs4qqlEP9Pb/view) | Build order, flip-trigger table, source-input list |
| 01 | `01_PLAN.md` | [link](https://drive.google.com/file/d/1PzmbLuXtaPIn28wly5WySYTQ5ST9z8yI/view) | Stack (Wix free → paid trigger), 14-day timeline, out-of-scope list |
| 02 | `02_SITEMAP.md` | [link](https://drive.google.com/file/d/195kyfD0IUJkfJ3Ox_p1LV7q3YjJwCpIW/view) | 9-page tree, CTA placement matrix, mobile-first rules, 44px tap targets |
| 03 | `03_SPECIFICATION.md` | [link](https://drive.google.com/file/d/1Er2htnRSoRRF3v33NQo0IIHSzxS3H_68/view) | 5 global components (GLOBAL-01…05), every page's section stack, final copy |
| 04 | `04_FIGMA_BRIEF.md` | [link](https://drive.google.com/file/d/1AWhdMIEuNwmcJFmrzqYTiv9dAqRB3GmS/view) | **14 color primitives, 6 type tokens, 8pt spacing scale, radii, shadows, borders, 7 components, 3-breakpoint grid, motion durations, a11y targets** |
| 05 | `05_NOTION_ARCHITECTURE.md` | [link](https://drive.google.com/file/d/1Bek2JgKVpJqw1hhwkz50Sx4Nzxnr9yC5/view) | Where copy and product data live (source of truth for content, not design) |
| 06 | `06_WIX_BUILD_GUIDE.md` | [link](https://drive.google.com/file/d/1NtLebHp05vB8MAX8uyE2bECkQ-J_0lV7/view) | The consumer of this system — Wix build steps |
| 07 | `07_VOICE_GUIDE.md` | [link](https://drive.google.com/file/d/1zuQH4m8VBx0THym3lmHCs0w78J1yDBla/view) | 12 canonical phrases, forbidden-word list, CTA verb rules → becomes lint rules |
| — | Purely Essential oil label + packaging | [PDF](https://drive.google.com/file/d/1snpm-QyVx8k2-vOHc963NttelUos7Twt/view) | Print color reference; must reconcile with screen palette |
| — | Flyer | [PDF](https://drive.google.com/file/d/1ynjQ44p1j_Djq1zZ5GKI7fi8nWrTlOtT/view) | Existing wordmark lockup, donation-mission framing |
| — | Landing PDF | [PDF](https://drive.google.com/file/d/1azmoNNwg0MLuQx4LIGXcNApWv0XBloWL/view) | Confirmed voice + "135+ five-star visits" trust numbers |
| — | Raster assets `1.png`, `2.png`, `IMG_2884/85/87` | same folder | Portraits + brand graphics for imagery tokens |

**Verdict:** the brand is already defined. What's missing is not taste — it's *structure*.

---

## 2. Gap analysis — what a design system needs that doesn't exist yet

| Layer | Exists in `04_FIGMA_BRIEF` | Missing | Severity |
|---|---|---|---|
| **Color primitives** | 14 named hexes | No `amber-600`; no neutral ramp beyond `ink-900/500`; no disabled/overlay/scrim values | Medium |
| **Semantic color** | ❌ none | No `--color-text-primary`, `--color-surface-raised`, `--color-border-focus`, etc. Every component hard-references a primitive → repaint is a find-and-replace | **High** |
| **Contrast** | Two claims, **one of them wrong** (see §3) | Full pairwise audit; enforced allow-list of legal fg/bg pairs | **Blocking** |
| **Typography** | 6 tokens, but families listed as *"X or Y"* — three unresolved forks | Final family lock, weight subset, a modular scale with named steps, line-height + tracking per step, fluid `clamp()` values | **Blocking** |
| **Spacing** | 8pt scale `4…128` | No semantic aliases (`--space-section-y`, `--space-card-pad`); no responsive step-down at 375px | Medium |
| **Radii / shadow / border** | Defined | Only one shadow; no focus-ring token; no elevation scale | Low |
| **Components** | 7 described in prose | Zero CSS. No state matrix (hover/focus/active/disabled/loading/error). Button spec exists but its default color pairing **fails AA** | **High** |
| **Layout** | 3 breakpoints, 12/8/4 columns | No container tokens, no named breakpoint variables, no grid utility | Medium |
| **Motion** | Durations + easings in prose | Not tokenized; `prefers-reduced-motion` stated but not implemented | Medium |
| **Content rules** | `07_VOICE_GUIDE` has do/don't | Not machine-checkable — no lint script for forbidden words, CTA verbs, sentence length | Medium |
| **Governance** | ❌ none | No version, no changelog, no contribution rule, no "who decides" | Medium |
| **Distribution** | ❌ none | No build step, no Wix-consumable output, no docs page | **High** |

---

## 3. Blocking findings — resolve before Phase 1

### 3.1 The accessibility claim in `04_FIGMA_BRIEF` §7 is incorrect

The brief asserts:

> `amber-900` on `cream-50` = 11.2:1 ✓ · `amber-500` on `cream-50` = **4.8:1 ✓**

Recomputed (WCAG 2.1 relative luminance, sRGB):

| Pair | Brief claims | Actual | Verdict |
|---|---|---|---|
| `amber-900` #3B2417 on `cream-50` #FBF7F0 | 11.2:1 | **13.56:1** | Passes AAA. Claim understated. |
| `amber-500` #B87D4B on `cream-50` #FBF7F0 | 4.8:1 ✓ | **3.24:1** | **FAILS AA for normal text.** Large text only (≥24px, or ≥18.7px bold). |
| `cream-50` on `amber-500` — *the primary button* | not stated | **3.24:1** | **FAILS AA.** Button labels are specced at 14–16px uppercase → non-compliant. |
| `amber-700` #6B4226 on `cream-50` | not stated | 8.08:1 | Passes AAA. |
| `ink-500` #5C4E45 on `amber-100` #F5E8D8 | not stated | 6.62:1 | Passes AA. Eyebrows are safe. |
| `error-500` #C0392B on `cream-50` | not stated | 5.09:1 | Passes AA. |
| `success-500` #7A8B5F on `cream-50` | not stated | 3.46:1 | **Fails AA** for normal text. |

**Consequence:** the Primary button as specified — filled `amber-500`, text `cream-50`, uppercase 14–16px — is not WCAG AA compliant. This appears on every page of the site.

**Recommended fix (Option A — least visual change):** introduce `amber-600` = **`#8E5D37`**, an interpolation 55% of the way from `amber-500` toward `amber-700`. It reads as the same warm amber and clears AA on all three light surfaces:

| `amber-600` #8E5D37 against | Ratio |
|---|---|
| `cream-50` #FBF7F0 | 5.21:1 ✓ AA |
| `white` #FFFFFF | 5.57:1 ✓ AA |
| `amber-100` #F5E8D8 | 4.62:1 ✓ AA |

Then: **`amber-600` becomes the interactive/primary token. `amber-500` is demoted to decorative-only** — large display numerals (the `01 · 02 · 03` service numbers at 40px), star glyphs, quote marks, borders, icon fills at ≥24px.

**Option B (zero new colors):** promote `amber-700` to primary fill. Ratio 8.08:1, unimpeachable, but noticeably darker and less "amber."

**Also fix:** `success-500` #7A8B5F → darken to pass AA, or use it only as a background with dark text.

> Decision needed from Amber/Jonah before Phase 1. Everything downstream inherits it.

### 3.2 Three unresolved font forks

`04_FIGMA_BRIEF` §1 leaves three "or" choices open. A design system cannot ship with an "or."

| Token | Fork | Recommendation | Why |
|---|---|---|---|
| `display-script` | Dancing Script **or** Pinyon Script | **Pinyon Script** | Pinyon is a copperplate script — closer to the existing flyer/label wordmark and reads as *practice*, not *party*. Dancing Script skews casual-craft. |
| `body-serif` | Cormorant Garamond **or** Playfair Display | **Cormorant Garamond** | Already chosen for display; using one family for display + body gives the italic-accent rule a single consistent italic. Playfair's high contrast gets fragile at 16px body. |
| `ui-sans` | Inter **or** Montserrat | **Inter** | Better small-size legibility at 11px with 0.12–0.2em tracking, which the eyebrow spec demands everywhere. |

**Caveat to verify:** Cormorant Garamond at 16px body has a small x-height and thin strokes — it may read as low-contrast on `cream-50` for the senior audience the donation mission explicitly serves. Phase 1 includes a real-device legibility check; the fallback is Inter for long-form body with Cormorant reserved for display + pull quotes.

### 3.3 Print vs. screen palette not reconciled

The `label and packaging for purely essential oil.pdf` (717 MB, print-res) has its own color reality. Nobody has confirmed the screen `amber-500` matches the printed label amber. Phase 1 includes an extraction step.

---

## 4. Architecture — three-layer token model

```
LAYER 1 — PRIMITIVES        (raw values, no meaning)
  color.amber.500 = #B87D4B
  size.space.24   = 24px
       ↓ referenced by
LAYER 2 — SEMANTICS         (role, no component)
  color.text.primary        → {color.ink.900}
  color.action.primary.bg   → {color.amber.600}
  space.section.y           → {size.space.96}
       ↓ referenced by
LAYER 3 — COMPONENTS        (component-scoped)
  button.primary.bg         → {color.action.primary.bg}
  button.primary.bg.hover   → {color.amber.700}
```

**Hard rule:** component CSS may reference *only* Layer 3. Layer 3 may reference *only* Layer 2. Layer 2 may reference *only* Layer 1. Any violation fails the build. This is what makes a repaint a one-file edit rather than a site-wide search.

### Output artifacts

| File | Format | Consumer |
|---|---|---|
| `tokens/primitives.json` | DTCG JSON | build script |
| `tokens/semantic.json` | DTCG JSON | build script |
| `tokens/component.json` | DTCG JSON | build script |
| `dist/tokens.css` | CSS custom properties on `:root` | Wix custom CSS block, any frontend |
| `dist/tokens.js` | ES module export | future custom build |
| `dist/tokens.wix.md` | Human table mapping tokens → Wix Site Design fields | Wix build (file 06) |
| `dist/components.css` | Class-based component CSS | Wix embeds + custom |
| `docs/index.html` | Self-contained living style guide | Amber, Jonah, any future designer |
| `CHANGELOG.md` | Keep-a-Changelog | governance |

---

## 5. Phases

Seven phases, each with a copy-paste prompt. Run in order — each consumes the previous phase's output.

| Phase | Output | Est. | Blocks |
|---|---|---|---|
| 0 | Decisions locked (contrast fix, fonts, print reconciliation) | 1 session | everything |
| 1 | `primitives.json` + contrast matrix | 1 session | 2 |
| 2 | `semantic.json` | 1 session | 3 |
| 3 | `component.json` + state matrix | 1–2 sessions | 4 |
| 4 | `dist/` build — CSS, JS, Wix map | 1 session | 5, 6 |
| 5 | `components.css` — the 7 components from `04_FIGMA_BRIEF` §2 | 2 sessions | 6 |
| 6 | `docs/index.html` living style guide | 1 session | 7 |
| 7 | Voice lint + governance + v1.0.0 tag | 1 session | — |

---

### PHASE 0 — Lock the decisions

**Prompt (copy-paste):**

```
ROLE
You are a design systems lead. You do not invent brand values. Every value you
output must trace to a source file or be explicitly marked TBD-DECISION.

INPUTS (read all before writing anything)
- 04_FIGMA_BRIEF.md  (design tokens, components, grid, motion, accessibility)
- 07_VOICE_GUIDE.md  (canonical phrases, forbidden words, CTA verb rules)
- label and packaging for purely essential oil.pdf
- Ambers-Essential-Touch-Flyer.pdf
- Amber's Essential Touch — Where Skin Care Becomes Ritual.pdf

TASK
Produce DECISIONS.md resolving exactly four open items. For each: state the
options, the recommendation, the reasoning in one paragraph, and the
consequence of choosing wrong.

1. PRIMARY INTERACTIVE COLOR
   Recompute WCAG 2.1 contrast for every foreground token against every
   background token in the palette. Confirm or refute that amber-500 #B87D4B
   on cream-50 #FBF7F0 is 4.8:1. Show your arithmetic (relative luminance per
   channel, then the (L1+0.05)/(L2+0.05) ratio).
   If it fails AA for normal text, propose a corrected primary that (a) clears
   4.5:1 against cream-50, white, AND amber-100, and (b) stays perceptually
   within the same warm-amber family — max ΔE2000 of 12 from amber-500.
   Output the corrected hex, all three ratios, and what amber-500 is demoted to.

2. TYPEFACE LOCK
   Resolve all three "X or Y" forks in 04_FIGMA_BRIEF §1. Pick one per token.
   Constraint: the donation mission explicitly serves seniors — assess whether
   the chosen body face is legible at 16px for presbyopic readers on a warm
   low-contrast background. If not, split display and body faces and say so.
   Output: final family, weights to load, Google Fonts subset, total KB.

3. PRINT/SCREEN RECONCILIATION
   Extract the dominant colors from the oil label PDF and the flyer PDF.
   Compare to the 14 screen primitives. Report which screen tokens drift from
   the printed brand and by how much. Recommend: adjust screen to match print,
   adjust print at next run, or accept the drift with a documented reason.

4. SCALE BASE
   04_FIGMA_BRIEF specifies display-serif at 40-72px and body at 16-20px but
   no ratio. Propose a modular type scale: base size, ratio, named steps, and
   the mobile (375px) vs desktop (1440px) values for each step. Justify the
   ratio against the existing specified sizes — do not pick a ratio that
   contradicts sizes already in the brief.

OUTPUT CONTRACT
- Single markdown file, DECISIONS.md
- Every number shown with its derivation
- Anything you cannot resolve from the source files: mark TBD-DECISION and
  name the specific person or artifact needed to resolve it
- Do NOT write any token files in this phase

FORBIDDEN
- Do not introduce a color, font, or phrase not derivable from the sources
- Do not soften a contrast failure. If it fails, say FAILS.
```

**Acceptance:** `DECISIONS.md` exists, all four items resolved or explicitly TBD with a named owner. Amber signs off on the primary color change before Phase 1.

---

### PHASE 1 — Primitives

**Prompt (copy-paste):**

```
ROLE
Design systems engineer. Output machine-readable tokens only.

INPUTS
- DECISIONS.md (Phase 0 output) — authoritative, overrides the brief on conflict
- 04_FIGMA_BRIEF.md §1 (color, typography, spacing, radii, shadows, borders)
- 02_SITEMAP.md (breakpoints, 44px tap targets, mobile-first rule)

TASK
Write tokens/primitives.json in W3C Design Token Community Group format
(https://tr.designtokens.org/format/). Groups required:

  color/      all 14 primitives from the brief, PLUS the corrected primary from
              DECISIONS.md, PLUS a neutral ramp (at minimum 50/100/300/500/700/900)
              derived from ink-900 #1C1410 and cream-50 #FBF7F0, PLUS
              overlay/scrim values as rgba.
  dimension/  spacing 4 8 12 16 24 32 48 64 96 128 (8pt grid, from the brief)
              radius  none 0, sm 2, md 8, pill 999
              size    tap-min 44, container-max 1200, hero-copy-max 680
              border  hairline 1, accent 1
  fontFamily/ locked families from DECISIONS.md, with full fallback stacks
  fontWeight/ only the weights actually loaded
  fontSize/   the modular scale from DECISIONS.md, every named step
  lineHeight/ one per fontSize step
  letterSpacing/ include the 0.12em and 0.2em tracking the brief requires for
              eyebrows, labels, CTAs, nav
  duration/   80ms 120ms 200ms 300ms (from 04_FIGMA_BRIEF §6)
  cubicBezier/ ease-out and whatever §6 implies
  shadow/     shadow-none, shadow-soft 0 8px 24px rgba(59,36,23,0.08)

RULES
- Every token gets a "$description" naming the source file and section
- No token references another token in this file — primitives are leaves
- Hex uppercase, 6-digit
- Dimensions in px as numbers with "$type": "dimension"

ALSO OUTPUT
tokens/contrast-matrix.md — a full pairwise WCAG 2.1 table of every text-capable
color against every surface-capable color. Mark each cell AAA / AA / AA-large /
FAIL. Then a section "LEGAL PAIRS" listing only the combinations approved for
body text, and "DECORATIVE ONLY" listing combinations allowed for >=24px display
or non-text graphics.

OUTPUT CONTRACT
- tokens/primitives.json — valid JSON, parses clean
- tokens/contrast-matrix.md
- No CSS yet. No semantics yet.

VERIFY BEFORE FINISHING
Re-derive three contrast ratios by hand and confirm they match your table.
State which three you checked.
```

**Acceptance:** JSON parses; every value traces to `04_FIGMA_BRIEF` or `DECISIONS.md`; contrast matrix has zero un-audited pairs.

---

### PHASE 2 — Semantics

**Prompt (copy-paste):**

```
ROLE
Design systems engineer.

INPUTS
- tokens/primitives.json (Phase 1)
- tokens/contrast-matrix.md (Phase 1) — the LEGAL PAIRS list is binding
- 03_SPECIFICATION.md (every page section, every global component)
- 02_SITEMAP.md (CTA placement matrix — which roles must exist on every page)

TASK
Write tokens/semantic.json. Every value is a {reference} to a primitive.
No raw hex, no raw px.

Required semantic groups, derived from what 03_SPECIFICATION actually uses:

  color.text/        primary, secondary, muted, inverse, accent, on-action,
                     eyebrow, error, success
  color.surface/     page, raised, sunken, section-warm (amber-100 bands),
                     section-mission (rose-300 donation band),
                     section-editorial (sage-400 rituals/blog)
  color.border/      hairline, accent, focus, error
  color.action/      primary.bg / .fg / .bg-hover / .bg-active / .bg-disabled
                     secondary.* , ghost.* , link.*
  space.             page-x (per breakpoint), section-y, block-y, card-pad,
                     stack-sm/md/lg, inline-gap
  type.              display-1, display-2, h1, h2, h3, body, body-lg, eyebrow,
                     label, button  — each binding fontFamily + size +
                     lineHeight + letterSpacing + weight
  motion.            hover, press, reveal, rail-enter
  elevation.         flat, card
  layout.            breakpoint-sm 375, -md 768, -lg 1440; columns 4/8/12;
                     gutter 16/24/24; margin 20/32/80  (from 04_FIGMA_BRIEF §3)

CONSTRAINTS
- Every color.text.* / color.surface.* combination that 03_SPECIFICATION pairs
  together must appear in the LEGAL PAIRS list. If a pairing the spec requires
  is not legal, DO NOT ship it — raise it as a BLOCKER with the ratio and a
  proposed substitute.
- The three section-band surfaces (warm, mission, editorial) come straight from
  04_FIGMA_BRIEF's stated usage for amber-100, rose-300, sage-400. Verify text
  on each is legal.
- Semantic names describe ROLE, never appearance. No "semantic.color.brown".

OUTPUT CONTRACT
- tokens/semantic.json
- BLOCKERS.md if any required pairing is illegal — otherwise state "no blockers"
```

**Acceptance:** zero raw values; zero illegal pairings shipped; blockers escalated not silently fixed.

---

### PHASE 3 — Component tokens + state matrix

**Prompt (copy-paste):**

```
ROLE
Design systems engineer.

INPUTS
- tokens/semantic.json (Phase 2)
- 04_FIGMA_BRIEF.md §2 (the 7 components, with their variants/states/sizes)
- 03_SPECIFICATION.md (GLOBAL-01 header, GLOBAL-02 footer, GLOBAL-03 floating
  CTA rail, GLOBAL-04 trust strip, GLOBAL-05 email capture)
- 02_SITEMAP.md (44px minimum tap target, sticky mobile Book bar)

TASK
Write tokens/component.json covering exactly these components:

  button        variants primary | secondary | ghost | link
                sizes   sm 36h | md 44h | lg 52h
  input         text | email | textarea | select | checkbox
  card.product  1:1 image, name, descriptor, size chips, price, link CTA
  card.service  numeral 40px, name 24px, descriptor, BOOK link
  card.review   quote glyph, italic quote, small-caps attribution, star row
  card.post     date, category tag, title, 2-line excerpt, read-time
  section-header eyebrow + h2 + italic-accent rule
  nav           desktop bar | mobile drawer | sticky mobile book-bar
  footer
  email-capture (GLOBAL-05)
  floating-rail (GLOBAL-03) — 3 x 44px circular, 12px gap
  trust-strip   (GLOBAL-04)

For EVERY interactive component produce a full state matrix. Columns:
  default | hover | focus-visible | active | disabled | loading | error
Every cell names the component token used. No cell may be blank — if a state
is intentionally identical to default, write "= default" explicitly.

HARD REQUIREMENTS
- Focus ring is 2px solid, 2px offset, and is NEVER removed (04_FIGMA_BRIEF §7)
- Every interactive target is >= 44x44px including padding
- Disabled states must still clear 3:1 against their surface — they must be
  visibly disabled, not invisible
- button.primary must use the corrected primary from DECISIONS.md, not amber-500
- Every value is a {reference} to a semantic token

OUTPUT CONTRACT
- tokens/component.json
- components/STATE-MATRIX.md — one table per interactive component
```

**Acceptance:** every state cell filled; no primitive referenced directly; focus ring present on 100% of interactive components.

---

### PHASE 4 — Build pipeline

**Prompt (copy-paste):**

```
ROLE
Build engineer.

INPUTS
- tokens/primitives.json, tokens/semantic.json, tokens/component.json

TASK
Write a zero-dependency Node build script, build.mjs, that:

1. Loads all three token files
2. VALIDATES the layer rule and exits non-zero on violation:
     - primitives.json contains zero {references}
     - semantic.json references ONLY primitives
     - component.json references ONLY semantics
     - no circular references
     - every {reference} resolves
3. Emits dist/tokens.css     — flat CSS custom properties on :root, grouped and
                               commented by layer, kebab-case
                               (--color-action-primary-bg, --space-section-y)
4. Emits dist/tokens.js      — ES module, nested object, named + default export
5. Emits dist/tokens.wix.md  — a human table mapping every token that has a
                               Wix Site Design equivalent:
                               | Token | Value | Wix field | Where to set it |
                               Cover: 5 Wix text themes, 6 Wix color slots,
                               button styles, page background. Explicitly list
                               tokens with NO Wix equivalent under
                               "Requires custom CSS embed".
6. Emits dist/tokens.report.md — counts per layer, orphan tokens (defined but
                               never referenced), and the resolved contrast
                               check re-run against the final CSS values

CONSTRAINTS
- Node built-ins only. No npm install. This must still run in three years.
- Deterministic output — same input, byte-identical output
- Script is idempotent and safe to re-run

ALSO
Add npm scripts: "build", "validate", "check:contrast".
Write README.md explaining how to add a token, in under 200 words, aimed at
someone who is not a developer.
```

**Acceptance:** `node build.mjs` runs clean from a fresh clone; validation catches a deliberately-broken reference; `dist/` regenerates byte-identically.

---

### PHASE 5 — Component CSS

**Prompt (copy-paste):**

```
ROLE
Frontend engineer building for a Wix custom-code embed today and a custom
frontend later.

INPUTS
- dist/tokens.css (Phase 4)
- components/STATE-MATRIX.md (Phase 3)
- 04_FIGMA_BRIEF.md §2, §3, §6, §7
- 02_SITEMAP.md (mobile-first, single column at 375, 3-col only at desktop)

TASK
Write dist/components.css implementing every component in the state matrix.

ARCHITECTURE
- Class-based, prefix "aet-" on every class (Wix embeds share a global scope —
  collisions are the failure mode)
- BEM-ish: .aet-btn, .aet-btn--primary, .aet-btn--lg, .aet-btn.is-loading
- Mobile-first: base styles are 375px, then min-width media queries at 768 and
  1440 using the layout breakpoint tokens
- Every declared value is var(--token). Zero magic numbers. If you need a value
  with no token, STOP and report it rather than hardcoding.
- Logical properties (padding-inline, margin-block) throughout
- No !important except where documented as a Wix-override necessity, and each
  such use carries a comment naming the Wix rule being overridden

REQUIRED BEHAVIORS
- :focus-visible ring on every interactive element, per Phase 3
- @media (prefers-reduced-motion: reduce) { } block disabling all scroll-reveal
  and transitions while preserving hover color changes (04_FIGMA_BRIEF §6-7)
- .aet-skip-link — visually hidden until focused (§7 keyboard requirement)
- Grid: .aet-grid with 4/8/12 columns at the three breakpoints
- .aet-container max-width 1200px; .aet-hero-copy max-width 680px
- Product grid 3-up desktop / 2-up tablet / 1-up mobile (03_SPECIFICATION Page 4)
- Sticky mobile book-bar, full-width, primary fill (02_SITEMAP mobile rules)
- Floating rail: bottom-right desktop 24px offset, bottom bar mobile;
  200ms slide-up, never bouncing (04_FIGMA_BRIEF §6)

ALSO OUTPUT
components/EXAMPLES.html — one self-contained page rendering every component in
every state side by side, using REAL copy pulled from 03_SPECIFICATION. Never
lorem ipsum. This file is the visual regression baseline.

VERIFY BEFORE FINISHING
List every CSS value in your output that is not a var(). The correct answer is
an empty list, or a short list with a written justification for each.
```

**Acceptance:** EXAMPLES.html renders every component × every state; no magic numbers; reduced-motion block present.

---

### PHASE 6 — Living style guide

**Prompt (copy-paste):**

```
ROLE
Documentation engineer.

INPUTS
- Everything from Phases 1-5
- 07_VOICE_GUIDE.md
- 03_SPECIFICATION.md

TASK
Write docs/index.html — a single self-contained file (inline CSS, inline JS,
no CDN, no build step) that a non-developer can open by double-clicking.

SECTIONS
1. Cover — wordmark lockup, "You'll FEEL the difference.", version, date
2. Voice — the 12 canonical phrases from 07_VOICE_GUIDE, the always/never word
   lists, and the do/don't table rendered as real styled examples
3. Color — every primitive as a swatch with name, hex, and its semantic aliases.
   Below it, the LEGAL PAIRS matrix rendered as actual colored text so a viewer
   SEES which pairs are readable, with the numeric ratio on each cell.
4. Typography — every type token rendered live at its real size, with a real
   sentence from 03_SPECIFICATION as the specimen. Show mobile and desktop
   values side by side.
5. Spacing — the 8pt scale as visual bars
6. Components — every component in every state, live, with the HTML snippet
   shown beneath in a copyable code block
7. Layout — the 3 grids rendered as visible column overlays
8. Motion — live demo buttons for each duration/easing, with a toggle that
   simulates prefers-reduced-motion
9. Accessibility — the checklist from 04_FIGMA_BRIEF §7 as real checkboxes
   with pass/fail status computed from the tokens
10. Changelog — rendered from CHANGELOG.md

REQUIREMENTS
- Works fully offline
- Every code snippet has a copy button
- A "copy all tokens as CSS" button
- Passes its own accessibility rules — this page must not violate the system
  it documents
```

**Acceptance:** opens offline; every component visible; contrast matrix rendered as real text, not just numbers.

---

### PHASE 7 — Voice lint + governance + release

**Prompt (copy-paste):**

```
ROLE
Systems engineer + governance author.

INPUTS
- 07_VOICE_GUIDE.md (the always/never lists, rhythm rules, voice checklist)
- 03_SPECIFICATION.md §"Voice rules" (the 10 enforced rules)
- Everything from Phases 1-6

TASK A — VOICE LINT
Write lint-voice.mjs (Node built-ins only). Given any .md, .html, or .txt file
it reports violations of the machine-checkable rules in 07_VOICE_GUIDE:

  ERROR   forbidden words: luxurious, indulgent, indulgence, pampering,
          treat yourself, spa day, affordable, cheap, deal, discount, learn more
  ERROR   "we" / "our" / "us" outside an approved client-quote block
  ERROR   exclamation mark in body copy (allowed inside blockquote)
  ERROR   medical claim verbs: cures, treats, heals  (suggest: supports, calms,
          softens, clears congestion)
  WARN    sentence longer than 18 words outside /about
  WARN    CTA that is a sentence rather than a verb — CTAs must be
          BOOK / READ / JOIN / SUPPORT / EXPLORE / SHOP / VIEW
  WARN    em-dash where a comma would do
  WARN    emoji in a headline or product description
  INFO    section with zero three-beat comma cadence
  INFO    page whose closing line does not return to: touch, held, carry, care,
          begin

Output: file, line, column, rule id, the offending text, and the suggested
replacement from 07_VOICE_GUIDE's do/don't table. Exit non-zero on any ERROR.
Run it against docs/index.html and components/EXAMPLES.html and fix what it finds.

TASK B — GOVERNANCE
Write GOVERNANCE.md covering:
- Who can change what (Amber owns voice + color; Jonah owns structure + code)
- How to propose a token change, and what evidence is required
- The rule that no color pairing ships without a contrast check
- Semantic versioning policy: what counts as MAJOR (removing/renaming a token),
  MINOR (adding), PATCH (value tweak within the same semantic role)
- Deprecation: mark, keep one MINOR, then remove
- The layer rule as a stated invariant

TASK C — RELEASE
- Write CHANGELOG.md in Keep-a-Changelog format, seeded with 1.0.0
- Write a 300-word handoff note aimed at Amber, in her own voice per
  07_VOICE_GUIDE, explaining what the design system is and what it protects.
  No jargon. It should read like something from the practice.
- Tag v1.0.0
```

**Acceptance:** lint runs clean on all generated docs; `GOVERNANCE.md` names a human owner per domain; v1.0.0 tagged.

---

## 6. Definition of done

The design system is v1.0.0 when all of these are true:

- [ ] `DECISIONS.md` signed off — primary color corrected, fonts locked
- [ ] Three token files parse; layer rule enforced by `build.mjs`
- [ ] Zero color pairings ship that fail WCAG AA for their text size
- [ ] Every interactive component has a filled 7-state matrix
- [ ] Every interactive target ≥ 44×44px
- [ ] `focus-visible` ring on 100% of interactive elements, never suppressed
- [ ] `prefers-reduced-motion` implemented, not merely documented
- [ ] `dist/tokens.wix.md` maps every token to a Wix field or flags it as custom-CSS-only
- [ ] `docs/index.html` opens offline and passes its own a11y checklist
- [ ] `lint-voice.mjs` exits 0 against all generated docs
- [ ] `GOVERNANCE.md` names an owner per domain
- [ ] `CHANGELOG.md` seeded, tagged v1.0.0

---

## 7. Where this sits in the existing build order

`00_START_HERE.md` specifies: **PLAN (01) → SITEMAP (02) → SPEC (03) → VOICE (07) → FIGMA (04) → NOTION (05) → WIX (06)**

Revised, with this file inserted:

```
01 PLAN → 02 SITEMAP → 03 SPEC → 07 VOICE → 04 FIGMA BRIEF
                                              ↓
                                    08 DESIGN SYSTEM  ← this file
                                    (Phases 0-7 produce dist/)
                                              ↓
                          05 NOTION → 06 WIX (consumes dist/tokens.wix.md
                                              + dist/components.css)
```

Per `01_PLAN.md` §3, the 14-day timeline allocates **Day 1** to "token list — Amber approves." That is Phase 0 only. Phases 1–7 are roughly 8–10 working sessions and should run parallel to Days 2–5 (Notion + copy), landing before Day 6 (wireframes) and well before Day 8 (Wix build).

**Cost impact: $0.** Everything here is text files and Node built-ins. It does not touch the flip-trigger table in `00_START_HERE.md`.

---

## 8. Appendix — full contrast audit (computed 2026-07-31)

WCAG 2.1 relative-luminance method, sRGB. Ratios rounded to 2dp.
**AAA** ≥ 7:1 · **AA** ≥ 4.5:1 · **AA-lg** ≥ 3:1 (large text / UI graphics only) · **FAIL** < 3:1

| foreground ↓ / surface → | cream-50 | amber-100 | white | peach-200 | rose-300 | sage-400 | amber-500 |
|---|---|---|---|---|---|---|---|
| **amber-900** #3B2417 | 13.56 AAA | 12.01 AAA | 14.48 AAA | 10.69 AAA | 7.95 AAA | 6.92 AA | 4.19 AA-lg |
| **amber-700** #6B4226 | 8.08 AAA | 7.16 AAA | 8.63 AAA | 6.37 AA | 4.74 AA | 4.13 AA-lg | 2.50 FAIL |
| **amber-500** #B87D4B | 3.24 AA-lg | 2.87 FAIL | 3.46 AA-lg | 2.55 FAIL | 1.90 FAIL | 1.65 FAIL | — |
| **amber-300** #D9A97A | 1.98 FAIL | 1.76 FAIL | 2.12 FAIL | 1.56 FAIL | 1.16 FAIL | 1.01 FAIL | 1.63 FAIL |
| **ink-900** #1C1410 | 17.00 AAA | 15.05 AAA | 18.15 AAA | 13.40 AAA | 9.97 AAA | 8.67 AAA | 5.25 AA |
| **ink-500** #5C4E45 | 7.47 AAA | 6.62 AA | 7.98 AAA | 5.89 AA | 4.38 AA-lg | 3.81 AA-lg | 2.31 FAIL |
| **white** #FFFFFF | 1.07 FAIL | 1.21 FAIL | — | 1.35 FAIL | 1.82 FAIL | 2.09 FAIL | 3.46 AA-lg |
| **cream-50** #FBF7F0 | — | 1.13 FAIL | 1.07 FAIL | 1.27 FAIL | 1.70 FAIL | 1.96 FAIL | 3.24 AA-lg |
| **error-500** #C0392B | 5.09 AA | 4.51 AA | 5.44 AA | 4.01 AA-lg | 2.99 FAIL | 2.60 FAIL | 1.57 FAIL |
| **success-500** #7A8B5F | 3.46 AA-lg | 3.06 AA-lg | 3.69 AA-lg | 2.73 FAIL | 2.03 FAIL | 1.77 FAIL | 1.07 FAIL |

**Proposed `amber-600` #8E5D37** — cream-50 **5.21 AA** · white **5.57 AA** · amber-100 **4.62 AA** · as a fill with cream-50 text **5.21 AA**.

### Immediate reads

1. **`amber-300` is not a text color anywhere.** It fails against every surface. Confine it to borders, dividers, and the large quote glyph — which is exactly what `04_FIGMA_BRIEF` §2 already does. Good.
2. **`amber-500` is not a text color on any surface** at body size. It survives only as ≥24px display or a fill. The brief's own claim to the contrary is the single most consequential error in the bundle.
3. **`ink-900` and `amber-900` are safe everywhere.** Default body text should be `ink-900` on `cream-50` at 17:1.
4. **The three band surfaces work** — `rose-300` (mission) and `sage-400` (editorial) both carry `amber-900` and `ink-900` legally. `ink-500` on `sage-400` at 3.81 is large-text-only; keep eyebrows on those bands at `amber-900`.
5. **`success-500` needs darkening** before it carries any text.

---

*Sources: all files in [ambers essential touch, the build out](https://drive.google.com/drive/folders/1EPrwlcJKTvey3uP2iKYQIWCIYuV5q_tU) and [amber-site](https://drive.google.com/drive/folders/1t_jeUUIm7d42rvWZxBRlxr2fCSjcAxVO), Google Drive.*
