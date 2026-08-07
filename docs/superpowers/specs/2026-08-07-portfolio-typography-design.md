# Portfolio Typography System

## Purpose

Establish one readable, print-safe typography system for the portfolio homepage,
all project case studies, and the PDF export page. The system must foreground
visual evidence and project imagery, while making supporting text easy to scan
in a browser and in an interview PDF.

## Selected Direction

**B: System Sans + Editorial Captions**

- `Noto Sans SC` is the primary family for all navigation, UI, project titles,
  section headings, body copy, data labels, and English/number fallbacks.
- `Noto Serif SC` is reserved for editorial photo captions and short
  observational notes in spatial and landscape work.
- No third display family is introduced. This prevents inconsistent visual
  voices across the medical, product, interaction, and landscape cases.

## Type Roles

| Role | Family | Desktop size / leading | Use |
| --- | --- | --- | --- |
| Project display | Noto Sans SC | 44-56px / 1.12-1.18 | Homepage hero and case hero only |
| Section heading | Noto Sans SC | 28-34px / 1.25 | Major content groups |
| Subheading | Noto Sans SC | 20-22px / 1.4 | Evidence, process, and image groups |
| Body | Noto Sans SC | 16px / 1.7-1.8 | Explanatory copy, with a 60-65ch measure cap |
| Editorial caption | Noto Serif SC | 15px / 1.7 | Landscape/space photo captions only |
| UI metadata | Noto Sans SC | 12-14px / 1.45-1.55 | Navigation, tags, dates, image indices |

At compact widths, body copy remains at least 16px. Display type reduces by
layout breakpoints rather than viewport-proportional font sizing. New rules do
not use negative letter spacing.

## Implementation Boundaries

1. Consolidate font loading in the homepage and case pages around the two Noto
   families, with Chinese-safe system fallbacks.
2. Add shared typography tokens and role rules to `css/style.css` and
   `css/case-study.css`; individual case pages may only override a role when a
   real layout constraint requires it.
3. Replace small, low-contrast labels and captions with the metadata role.
4. Apply `Noto Serif SC` only to caption selectors in visual/spatial cases,
   never to functional UI or dense paragraphs.
5. Update `portfolio-pdf.html` to the same family choices and print-size scale.
6. Do not alter project content, imagery, layout ordering, or original source
   materials as part of this typography pass.

## Accessibility And Print Rules

- Body text and meaningful labels must meet a 4.5:1 contrast ratio.
- Reading copy uses at least 16px on screen and a 9-10pt equivalent in print.
- Text blocks cap at 65ch where a paragraph is meant for sustained reading.
- Headings use `text-wrap: balance`; descriptive paragraphs use `text-wrap:
  pretty` where supported.
- Captions must remain distinguishable at 200% browser zoom and in exported PDF.
- Printable pages preserve image/caption pairings and avoid splitting captions
  from their image where CSS break controls support it.

## Acceptance Checks

1. Homepage, landscape, product, rehabilitation, tide, and reBot pages share
   the primary sans stack and display a clear hierarchy.
2. Landscape captions visibly use the serif voice while titles, metadata, and
   body copy remain sans-serif.
3. No new text is below 12px; persistent reading copy is no smaller than 16px.
4. No new negative tracking is introduced.
5. Desktop and mobile layouts have no text overflow or horizontal scrolling.
6. `portfolio-pdf.html` uses the same hierarchy and remains readable in print.

## Known Baseline Issues

The pre-change system is estimated at 5/10 against the typography skill's
diagnostic: it has usable base copy in places, but fails consistency, label
readability, type-family discipline, and print alignment. These criteria are
the baseline for the implementation audit.
