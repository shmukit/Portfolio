# Visual Style Guide

## Design Philosophy

This portfolio embodies minimalist modernism inspired by [seyityilmaz.com](https://seyityilmaz.com) - where content takes precedence, whitespace creates rhythm, and every element serves a purpose. The design prioritizes readability, subtle interactions, and a sense of vertical flow that guides users through the timeline.

## Color System

### Primary Palette
```css
--color-background: #ffffff;
--color-surface: #fafafa;
--color-primary: #000000;
--color-secondary: #6b7280;
--color-accent: #6366f1;
--color-accent-hover: #5856eb;
```

### Semantic Colors
```css
--color-text-primary: var(--color-primary);
--color-text-secondary: var(--color-secondary);
--color-text-muted: #9ca3af;
--color-border: #e5e7eb;
--color-shadow: rgba(0, 0, 0, 0.1);
```

### State Colors
```css
--color-hover: rgba(99, 102, 241, 0.1);
--color-active: var(--color-accent);
--color-focus: var(--color-accent);
--color-disabled: #d1d5db;
```

## Typography System

### Font Families
- **Headings**: "Inter Tight", "Geist", sans-serif
- **Body**: "Manrope", "Inter", sans-serif
- **Monospace**: "JetBrains Mono", "Fira Code", monospace

### Type Scale
| Element | Size | Line Height | Weight | Usage |
|---------|------|-------------|--------|-------|
| Display | 64px/4rem | 1.1 | 700 | Hero titles |
| H1 | 48px/3rem | 1.2 | 600 | Section titles |
| H2 | 32px/2rem | 1.3 | 600 | Project titles |
| H3 | 24px/1.5rem | 1.4 | 500 | Subsection titles |
| Body Large | 18px/1.125rem | 1.6 | 400 | Lead paragraphs |
| Body | 16px/1rem | 1.6 | 400 | Standard text |
| Caption | 14px/0.875rem | 1.5 | 400 | Metadata |
| Small | 12px/0.75rem | 1.4 | 400 | Fine details |

### Typography Guidelines
- **Line length**: 50-75 characters for optimal readability
- **Paragraph spacing**: 1.5x line height between paragraphs
- **Letter spacing**: Slightly increased for headings (-0.025em to 0.025em)
- **Text contrast**: Minimum 4.5:1 ratio for accessibility

## Layout & Spacing

### Grid System
```css
--container-padding: 2rem; /* 32px */
--section-spacing: 6rem;   /* 96px */
--element-spacing: 1.5rem; /* 24px */
--compact-spacing: 1rem;   /* 16px */
```

### Responsive Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Sidebar Layout
- **Desktop width**: 280px-320px
- **Tablet width**: 240px-280px
- **Mobile**: Converts to top navigation (60px height)

### Main Content Area
- **Desktop**: calc(100vw - 300px) with proper padding
- **Tablet**: calc(100vw - 260px) with adjusted spacing
- **Mobile**: 100vw with top navigation

## Component Specifications

### Project Card
```css
Dimensions: 400px × 200px (desktop)
Border Radius: 16px (2xl)
Padding: 24px
Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
Hover Transform: translateY(-2px) scale(1.02)
```

### Detail Panel
```css
Width: 50vw (desktop), 90vw (tablet), 100vw (mobile)
Height: 100vh
Background: rgba(0, 0, 0, 0.5) backdrop
Animation: slide in from right (300ms)
```

### Buttons
```css
Height: 44px (touch target)
Padding: 12px 24px
Border Radius: 8px
Font Weight: 500
Hover: subtle background shift
```

## Animation & Motion

### Easing Functions
```css
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Durations
- **Instant**: 0ms (color changes, visibility)
- **Fast**: 150ms (hover states, micro-interactions)
- **Normal**: 300ms (panel transitions, page changes)
- **Slow**: 500ms (content reveals, scroll animations)
- **Leisurely**: 800ms (initial page load sequence)

### Animation Principles
1. **Purposeful**: Every animation serves user goals
2. **Subtle**: Enhances without distracting
3. **Consistent**: Similar actions have similar animations
4. **Performant**: Uses transform and opacity properties
5. **Accessible**: Respects reduced motion preferences

## Icon System

### Icon Library
- **Primary**: Heroicons (24px, outline style)
- **Sizes**: 16px (small), 20px (medium), 24px (large)
- **Colors**: Match text colors, accent for interactive elements

### Icon Usage
- **Navigation**: Chevron, arrow indicators
- **Actions**: Plus, minus, close (X), download
- **Social**: Brand-specific social icons
- **Status**: Check marks, warning triangles

## Image Treatment

### Project Images
- **Aspect ratio**: 16:9 for consistency
- **Border radius**: 12px (rounded-xl)
- **Loading**: Blur placeholder → sharp image
- **Hover**: Subtle zoom effect (scale 1.05)

### Thumbnail Images
- **Size**: 60px × 60px (square crop)
- **Border radius**: 8px
- **Fallback**: Gradient background with initials

## Shadows & Depth

### Elevation Scale
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Usage Guidelines
- **Cards**: shadow-lg for subtle depth
- **Panels**: shadow-xl for modal-like elevation
- **Interactive elements**: shadow-md on hover
- **Static content**: shadow-sm or none

## Responsive Patterns

### Mobile-First Considerations
- **Touch targets**: Minimum 44px × 44px
- **Text sizes**: Scale down proportionally
- **Spacing**: Reduce by 20-30% on mobile
- **Navigation**: Collapse sidebar to hamburger menu

### Tablet Optimizations
- **Layout**: Maintain two-column structure
- **Interactions**: Support both touch and hover
- **Typography**: Slightly larger than mobile
- **Images**: Higher resolution for retina displays

## Accessibility Standards

### WCAG Compliance
- **Color contrast**: 4.5:1 minimum for normal text
- **Focus indicators**: Visible 2px outline
- **Keyboard navigation**: Full keyboard support
- **Screen readers**: Semantic HTML and ARIA labels

### Inclusive Design
- **Reduced motion**: Respects user preferences
- **Color blindness**: Avoids color-only information
- **Font scaling**: Supports up to 200% zoom
- **Cognitive load**: Clear information hierarchy

## Browser Support

### Modern Browsers
- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile Safari**: 14+

### Progressive Enhancement
- **Core functionality**: Works without JavaScript
- **Enhanced features**: Progressive enhancement for modern browsers
- **Fallbacks**: Graceful degradation for older browsers

## Performance Guidelines

### Loading Performance
- **Critical CSS**: Inline critical styles
- **Font loading**: font-display: swap
- **Image optimization**: WebP with fallbacks
- **Bundle splitting**: Route-based code splitting

### Runtime Performance
- **Animation optimization**: Use transform and opacity
- **JavaScript efficiency**: Debounced scroll handlers
- **Memory management**: Cleanup event listeners
- **Battery optimization**: Respect reduced motion preferences

This style guide ensures visual consistency, accessibility, and performance while maintaining the minimal, modern aesthetic that defines contemporary portfolio design philosophy.
