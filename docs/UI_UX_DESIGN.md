# UI/UX Design Specification

This is the canonical UI/UX design document for the portfolio platform.

## Scope

This document defines:
- UX principles and user flows
- interaction patterns across device classes
- motion and feedback behavior
- visual system tokens and usage guidance
- accessibility requirements

Technical implementation details live in `docs/TECHNICAL_ARCHITECTURE.md`.

## UX Principles

- **Content-first clarity**: projects and outcomes are the primary focus.
- **Low-friction exploration**: users can discover, inspect, and dismiss details quickly.
- **Consistent interaction grammar**: similar actions should feel similar on desktop and mobile.
- **Progressive disclosure**: summary first, details on demand.
- **Respectful motion**: transitions aid comprehension without adding noise.

## Information Architecture

- **Home**: hero, CTAs, and entry point to portfolio/failures.
- **Portfolio collection**:
  - project pills/list by year or collection
  - detail modal/panel for selected project
- **Failure collection**:
  - list of failures
  - details overlay with STAR narrative and media

## User Flows

### Portfolio Discovery
1. User opens page and sees hero + action buttons.
2. User opens portfolio.
3. User selects a project from list/pills.
4. User scans STAR blocks, key results, contributions, skills, and links.

### Failure Review
1. User opens failures section.
2. User selects an item with details.
3. User reads context (situation/task/result) and lessons.

### Mobile Navigation
1. User opens a project in modal.
2. User swipes left/right or taps side hit zones to navigate adjacent projects.
3. User closes with close icon or backdrop tap.

## Layout System

- **Desktop**:
  - left-side project list rail
  - center-right detail modal zone
  - hero occupies center canvas when no modal is active
- **Mobile**:
  - stacked content
  - fullscreen modal overlays for details

## Interaction Patterns

- **Card/pill hover**: light elevation/scale hint (desktop).
- **Tap/press feedback**: subtle downscale.
- **Modal open/close**: backdrop fade + panel motion.
- **Close affordance**: visible close icon and backdrop dismissal.
- **Bullet parsing in STAR blocks**: hyphen-separated lines render as visual bullet lists for readability.

## Motion System

- **Micro interactions**: ~100-200ms for hover/tap states.
- **Panel/modal transitions**: ~260-320ms with smooth cubic easing.
- **Staggered reveals**: used selectively for load and list polish.
- **Reduced motion**: motion reduced or simplified when user preference is enabled.

## Visual System

### Typography
- Display and headings use expressive sans styles.
- Body text prioritizes legibility and scanability.
- Hierarchy is conveyed through size, weight, and spacing instead of heavy decoration.

### Color
- Neutral base palette for readability.
- Accent gradients used for highlight points, CTA energy, and identity cues.
- Semantic contrast supports both light and dark themes.

### Spacing
- Generous section spacing for readability.
- Compact spacing within metadata groups and chips.
- Consistent rhythm between title, context, and outcome blocks.

### Components
- Rounded cards/chips with soft borders and restrained shadows.
- Tags use pill treatment and wrap naturally instead of truncating with overflow counters.
- Media containers preserve aspect constraints and responsive sizing.

## Responsive and Input Adaptation

- **Desktop**: hover-rich interactions, larger canvases, side rail navigation.
- **Tablet**: touch-first with preserved structural hierarchy.
- **Mobile**: modal-first detail reading and gesture-assisted navigation.
- **Touch targets**: minimum practical dimensions for accessibility.

## Accessibility Requirements

- Logical heading order and semantic landmarks.
- Keyboard navigability for actionable controls.
- Clear focus visibility for interactive elements.
- Screen-reader friendly labels for buttons and icons.
- Contrast levels targeting WCAG AA.
- Motion preferences respected via reduced-motion strategies.

## UX Performance Constraints

- Keep transitions smooth on mid-tier mobile devices.
- Prefer transform/opacity animations.
- Avoid long blocking sequences before first meaningful interaction.
- Use lightweight loading and fallback states for media-heavy sections.

## Component UX Specs

- **MobileHeader**: concise hero context + quick action affordances.
- **PortfolioClient**: project discovery, modal management, and mobile navigation.
- **ProjectContent**: STAR narrative readability and evidence density.
- **FailuresClient**: symmetric detail exploration for failed experiments.
- **CTASection**: clear wayfinding into portfolio, deep dives, and invitations.

## Future UX Backlog

- Optional progress indicators for explored projects.
- Deeper narrative mode for long-form case studies.
- Unified keyboard shortcut map for power users.

---

*Last updated: March 2026*
