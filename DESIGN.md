# Design Brief

## Intent
Premium secure voting platform inspired by Kanishk Portfolio — glassmorphism dark UI, refined trust aesthetic, sophisticated typography, orchestrated Framer Motion animations.

## Color Palette (OKLCH)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| **Primary** | `0.5 0.15 250` | `0.7 0.18 250` | Cyan accents, call-to-actions, ballot selection |
| **Accent** | `0.65 0.18 40` | `0.65 0.18 40` | Warm amber highlights, success/positive states |
| **Destructive** | `0.55 0.22 25` | `0.65 0.19 22` | Warnings, invalid ballots |
| **Background** | `0.99` | `0.12` | Page base—light off-white to deep navy |
| **Card** | `0.96` | `0.16` | Glass cards with backdrop blur |
| **Border** | `0.88` | `0.24` | Subtle 1px dividers with 40% opacity |

## Typography

| Layer | Family | Size | Weight | Use |
|-------|--------|------|--------|-----|
| **Display** | Space Grotesk | 32–48px | 600–700 | Headlines, election title, section headers |
| **Body** | DM Sans | 14–16px | 400–500 | Content, ballot descriptions, metadata |
| **Mono** | Geist Mono | 12–14px | 500 | Vote IDs, timestamps, cryptographic hashes |

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| **Header** | Glass card with cyan border/glow, marquee status bar | `glass-elevated` class, "Election Live • Secure • Anonymous" scrolling text |
| **Ballot Section** | Muted background with staggered card reveals | Each ballot option: glass card, scale/color hover, cyan focus ring |
| **Results Dashboard** | Dark background with chart cards (glass) | Chart tokens use primary/accent palette, legend in mono |
| **Footer** | Minimal, muted foreground on background | Vote ID, verification link, accessibility note |

## Motion & Animation

| Element | Trigger | Behavior | Duration |
|---------|---------|----------|----------|
| **Page Entry** | Initial load | Fade in + scale (0.95→1.0), staggered sections | 0.4s easing |
| **Ballot Options** | Hover | Scale 1→1.05, shadow elevation | 0.3s cubic-bezier |
| **Status Marquee** | Loop | Horizontal scroll, infinite repeat | 40s linear |
| **Vote Confirmation** | Submit | Fade in + scale, success check animation | 0.6s ease-out |
| **Chart Reveals** | Section scroll | Staggered fade + slide-up per bar/slice | 0.5s with 100ms stagger |

## Component Patterns

- **Buttons**: `btn-primary-glow` for CTAs; primary color with shadow elevation on hover
- **Cards**: `glass` for secondary, `glass-elevated` for primary interactive surfaces
- **Forms**: Cyan ring on input focus; invalid state uses destructive color + icon
- **Badges**: Accent color background, dark text; mono font for vote IDs
- **Status Bar**: Marquee scroller with cyan primary text on dark card background

## Signature Detail
Backdrop blur glassmorphism on all interactive cards (0.2–0.4 opacity borders) paired with cyan accent glow creates a sense of modern cryptographic security while remaining visually warm and approachable. Cyan → democracy/transparency; subtle warmth → human trust.
