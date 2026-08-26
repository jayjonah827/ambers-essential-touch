# data/ — the content model

Everything previously built, as data the rebuild reads. No hard-coded copy in components.

| File | Holds |
|---|---|
| `sources.json` | Authority hierarchy, what was harvested from where, and every retired/fabricated fact |
| `site.json` | Identity, tagline, contact, hours, mission, social proof |
| `credentials.json` | Years, licensing body, specialisms, bio, the "why clients love AET" strip |
| `services.json` | Canonical five + full waxing menu + bundles, reconciled to Amber's own published prices |
| `testimonials.json` | Approved vs unverified, kept separate on purpose |
| `brand.json` | Five essences, voice rules, photography direction, logo grammar |
| `decisions.json` | D-1…D-10 plus infrastructure items I-1…I-4, with status |
| `tokens.json` | W3C DTCG design tokens (mirrors `css/tokens.css`) |

## The two rules

1. **Every field carries `verified`.** Anything `false` renders as a visible labelled placeholder, never as invented text. `blockedBy` names the decision that unblocks it.
2. **Authority is ranked.** Amber's own flyer and Instagram beat the VLS board, which beats the asset register, which beats the Claude Design project, which beats the Drive bundle. A lower rank may fill a gap, never overwrite a higher rank.

## Launch gate

No page ships while it still contains a fabricated fact. The placeholders are deliberate — they are cheaper than a correction.

Full reasoning: `spec/AET_FINAL_SPEC.md`.
