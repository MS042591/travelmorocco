# Airbnb Design System (Travel Morocco Implementation)

## Overview
The Airbnb Design System is a photography-led, consumer-first marketplace aesthetic. It prioritizes high-quality imagery, soft shapes, and a minimalist monochrome canvas with a single high-voltage accent color (**Rausch**).

---

## Core Tokens

### Colors
| Token | Value | Use Case |
|---|---|---|
| **Canvas** | `#ffffff` | Default background for all pages. No dark mode. |
| **Rausch (Primary)** | `#ff385c` | Primary CTAs, Search Orb, Heart states, brand links. |
| **Rausch Active** | `#e00b41` | Press/Active state for primary buttons. |
| **Ink** | `#222222` | Primary text color (Headlines, Body, Icons). |
| **Muted** | `#6a6a6a` | Secondary text, sub-labels, captions. |
| **Hairline** | `#dddddd` | 1px borders, separators, search dividers. |
| **Surface Soft** | `#f7f7f7` | Hover backgrounds, secondary fills. |

### Typography
- **Primary Font**: `Inter` (Fallback for Airbnb Cereal VF)
- **Voice**: Modest weights, no aggressive heavy weights. Headlines rely on photography for impact.
- **Hierarchy**:
    - **Display**: 28px - 32px / 700 (Hero H1)
    - **Title MD**: 16px / 600 (Card titles)
    - **Body MD**: 16px / 400 (Running text)
    - **Body SM**: 14px / 400 (Meta info, prices)
    - **Caption**: 12px / 700 (Uppercase labels)

### Shape & Elevation
- **Soft Corners**:
    - `rounded-airbnb-sm` (8px): Buttons, inputs.
    - `rounded-airbnb-md` (14px): Property cards, modals.
    - `rounded-airbnb-pill` (9999px): Search bar, badges.
- **Elevation**: Single shadow tier.
    - `shadow-airbnb`: `0 4px 8px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)`

---

## Core Components

### 1. Global Search Pill
- **Shape**: Fully rounded (pill).
- **Structure**: Divided into "Where", "When", and "Who" segments by vertical hairlines.
- **Search Orb**: A circular Rausch (#ff385c) button on the right edge.
- **Behavior**: White surface with a subtle 1px shadow/border.

### 2. Property / Experience Cards
- **Photo-First**: Aspect-ratio square or rectangle (1:1 or 4:5).
- **Corner Clipping**: 14px radius.
- **Badges**: "Guest favorite" white pill badge top-left.
- **Heart**: Transparent/Outline heart top-right (Rausch when saved).
- **Meta Block**: Text sits *below* the photo, not overlaid. Star rating in Ink text next to title.

### 3. Primary Button (Reserve/Search)
- **Fill**: Rausch (#ff385c).
- **Text**: White, 16px, weight 600.
- **Radius**: 8px.
- **Height**: 48px standard.

### 4. Navbar & Footer
- **Navbar**: Wordmark flush left, product tabs (Stay, Experiences) center with underline active state, account menu right.
- **Footer**: Pure white background. Columnar links (Support, Hosting, etc.). Bottom legal band with language/currency icons.

---

## Design Principles
1. **Trust Photography**: If a section feels empty, add high-quality photography rather than larger type.
2. **Generous Whitespace**: 64px section padding (`spacing.section`) provides room without feeling overly airy.
3. **Avoid Hard Corners**: Every interactive element must be rounded.
4. **Monochrome First**: 95% of the UI should be White + Ink. Use Rausch only for what the user *needs* to click.
