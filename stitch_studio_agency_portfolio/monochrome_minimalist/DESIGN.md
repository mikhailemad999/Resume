---
name: Monochrome Minimalist
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#585f6c'
  on-secondary: '#ffffff'
  secondary-container: '#dce2f3'
  on-secondary-container: '#5e6572'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#828486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#dce2f3'
  secondary-fixed-dim: '#c0c7d6'
  on-secondary-fixed: '#151c27'
  on-secondary-fixed-variant: '#404754'
  tertiary-fixed: '#e1e2e4'
  tertiary-fixed-dim: '#c5c6c8'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 0.5rem
  sm: 1rem
  md: 2rem
  lg: 4rem
  xl: 8rem
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built on the principles of **Minimalism** and **High-Contrast** precision. It is designed for professional portfolios, premium SaaS platforms, and editorial experiences where content is the primary focus. The aesthetic is intentional and austere, characterized by an expansive use of whitespace (negative space) and a strictly controlled palette. 

The emotional response should be one of clarity, sophistication, and quiet confidence. By removing unnecessary ornamentation, the system directs all attention to typography and structural alignment. It avoids visual noise in favor of "airy" layouts and hairline-thin borders that define space without crowding it.

## Colors

The palette is strictly monochromatic. Contrast is used as a functional tool to establish hierarchy rather than purely for decoration. 

- **Primary**: A deep, near-black for maximum legibility in typography and primary CTAs.
- **Secondary**: A muted grey used for secondary information, meta-data, and less critical UI labels.
- **Tertiary**: A very light grey for subtle backgrounds, dividers, and ghost surfaces.
- **Neutral**: Pure white, serving as the canvas for the entire system.

Surface colors should be layered sparingly to maintain the "airy" feel. Avoid heavy fills; prefer white backgrounds with subtle hairline borders.

## Typography

The design system utilizes **Inter** exclusively to ensure a systematic, utilitarian appearance that scales across all devices. Typography is the primary driver of the visual identity.

Large "Display" sizes should use tight letter spacing and a semi-bold weight to create impact against the vast white space. Body text is optimized for readability with a generous 1.6x line height. Navigation and labels use a slightly tighter font size with medium weight to maintain a professional, structured feel. High-contrast black-on-white is the default for all primary text elements.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model with an emphasis on "airy" margins. Content should be centered with significant horizontal padding to create a focused, editorial column.

Spacing relies on a 4px base unit, but emphasizes the larger increments (`lg` and `xl`) to create the signature "Portfolio" look. Sections should be separated by aggressive vertical padding (e.g., 128px or more) to ensure each piece of content has room to breathe. Use "no-grid" logic for internal component arrangements to allow for contextual, optical alignment.

## Elevation & Depth

This system avoids traditional shadows to maintain its flat, minimalist aesthetic. Instead, depth is communicated through **Low-contrast outlines** and **Tonal layers**.

- **Borders**: Use 1px solid lines in `tertiary` or a slightly darker grey to define regions.
- **Surface Stacking**: A subtle background change from pure white to a light grey (Tertiary) can indicate a container or a section change.
- **Interactivity**: Hover states should be indicated by color inversions (e.g., a white button turning black) or subtle opacity shifts rather than elevation/shadows.

## Shapes

The shape language is **Soft** but disciplined. Primary containers and buttons use a subtle 4px (0.25rem) radius. This creates a modern feel that is less "aggressive" than sharp corners but more "architectural" than pill-shaped designs.

Avoid large-scale rounding; the goal is to maintain the geometric integrity of the layout.

## Components

### Buttons
Primary buttons are solid black with white text, using a subtle 4px corner radius. Secondary buttons are "ghost" style: 1px black or grey border with no fill. Padding should be generous horizontally (24px-32px).

### Input Fields
Inputs are defined by a bottom-border only or a very light 1px perimeter border. Use `body-md` for placeholder text in the secondary grey color. Focus states should simply darken the border to primary black.

### Cards
Cards should not have shadows. They are defined by a 1px border (`tertiary` color) and significant internal padding (`md` spacing).

### Lists
Lists are separated by 1px hairline dividers. Items should have generous vertical padding (16px-24px) to ensure they feel premium rather than utility-dense.

### Chips/Tags
Small, rectangular tags with a light grey fill and no border. Text is `label-sm` in primary black.