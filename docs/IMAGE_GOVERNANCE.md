# Image governance

## Registers

`data/research/visual_asset_register.csv` is the instance-level authority. Each row includes dimensions, hash, provenance, review batch, approval, usage, embedded-text status, identity sensitivity, and a content summary.

`content/visual_review_batches.csv` links each reviewed group to a contact sheet under `research/review-sheets/`.

## Approval classes

- `owner_approved`: approved identity reference only.
- `identity_source`: Amber photograph or other first-party identity evidence.
- `source_evidence`: observed source, not automatic publication approval.
- `owner_directed_reference`: generated work made to a current direction, still not a final licensed publication asset.
- `development_reference_not_label_approval`: product photography concept whose baked label is not approved.
- `explicitly_rejected`: retained only to prevent reuse.
- `not_approved_as_standalone`: fragment, mask, crop, or remnant that cannot be promoted to a final asset.

## People and identity

Amber portraits may support identity research. Client, model, and social images require consent and rights verification before public use. Generated people must never be described as Amber or a real client. Retouching must not erase age, marks, texture, or skin tone.

## Hand-as-product boundary

An Amber hand icon or airbrush asset must originate from an owner-approved hand photograph, preserve recognizable nail and hand characteristics, and receive approval before use. Do not infer her hand from a face portrait or substitute a generated generic hand.

## Service imagery

The ten images in `amb.zip` and the six current `treat-*` crops are specifically tracked. Their dark botanical material language is valid source evidence, but the owner later directed a brighter sunlit, moist, floral, gradient system.

## Product imagery

The eight individual product mockups are development references. Generated label text is not approved. The dark industrial family group is explicitly rejected. Product images remain separate from site hero research.

## Embedded text

Images with baked text are never treated as editable copy. Copy is extracted and sourced separately. Future service cards should use text-free imagery with accessible live text in the interface.
