# Design System Specification
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24

---

## 1. Design Principles

### Core Values
- **Impeccable Quality:** Every pixel matters, every interaction delightful
- **Clarity:** Visual hierarchy guides the eye naturally
- **Consistency:** Patterns repeat predictably across components
- **Performance:** Beauty without bloat
- **Accessibility:** Beautiful for everyone

### Design Philosophy
This design system prioritizes **functional aesthetics** — every design decision serves usability while maintaining visual excellence. We favor subtle elegance over flashy effects, and ensure the content (your work, links, projects) remains the hero.

---

## 2. Color System

### 2.1 Base Palette (HSL Format)

**Why HSL?** Easier to create variants (lighter/darker) and maintain consistent saturation across themes.

```css
:root {
  /* Primary - Brand color for main actions and emphasis */
  --primary: 221 83% 53%;        /* #3b82f6 - Default blue */
  --primary-foreground: 0 0% 100%;
  
  /* Accent - Secondary brand color for highlights */
  --accent: 262 83% 58%;         /* #8b5cf6 - Default purple */
  --accent-foreground: 0 0% 100%;
  
  /* Neutral Scale - Grays for text, borders, backgrounds */
  --background: 0 0% 100%;       /* #ffffff */
  --foreground: 222 47% 11%;     /* #0f172a - Dark blue-gray */
  
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  
  --muted: 210 40% 96%;          /* #f1f5f9 - Light gray */
  --muted-foreground: 215 16% 47%; /* #64748b - Medium gray */
  
  --border: 214 32% 91%;         /* #e2e8f0 */
  --ring: 221 83% 53%;           /* Focus ring = primary */
  
  /* Semantic Colors */
  --success: 142 71% 45%;        /* #22c55e - Green */
  --warning: 38 92% 50%;         /* #f59e0b - Orange */
  --error: 0 84% 60%;            /* #ef4444 - Red */
}
```

### 2.2 Theme Customization

Users can customize primary and accent colors via `content.json`:

```json
{
  "theme": {
    "primaryColor": "#3b82f6",   // Converted to HSL at build time
    "accentColor": "#8b5cf6",
    "backgroundColor": "#ffffff"
  }
}
```

**Color Conversion Function:**
```typescript
// lib/utils.ts
export function hexToHSL(hex: string): string {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  
  // Convert RGB to HSL
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
```

### 2.3 Accessibility Standards

**Contrast Ratios (WCAG 2.1 AA):**
- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px or ≥ 14px bold): 3:1 minimum
- UI components: 3:1 minimum

**Validation:**
Test all theme colors at https://contrast-ratio.com/

---

## 3. Typography

### 3.1 Font Stack

**Primary Font:** Inter (Google Fonts)
- Variable font for optimal loading
- Supports weights 400–700
- Excellent readability at all sizes

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

**Fallback Stack:**
```css
font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
```

### 3.2 Type Scale

```css
/* app/globals.css */
:root {
  /* Base size: 16px */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

### 3.3 Typography Hierarchy

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Profile Name | 2xl (24px) | 700 | 1.2 | Main heading |
| Profile Bio | base (16px) | 400 | 1.5 | Subheading |
| Card Title | lg (18px) | 600 | 1.4 | Card headings |
| Card Description | sm (14px) | 400 | 1.5 | Card body text |
| Card Metadata | xs (12px) | 500 | 1.4 | Tags, labels |

**Code Example:**
```tsx
// Profile name
<h1 className="text-2xl font-bold leading-tight">
  {profile.name}
</h1>

// Card title
<h2 className="text-lg font-semibold leading-snug">
  {card.title}
</h2>
```

---

## 4. Spacing System

### 4.1 Base Unit: 4px Grid

All spacing uses multiples of 4px for visual consistency.

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
```

### 4.2 Layout Spacing

| Context | Spacing | Tailwind Class |
|---------|---------|----------------|
| Card padding | 16px (space-4) | `p-4` |
| Card gap (mobile) | 16px | `gap-4` |
| Card gap (tablet) | 20px | `gap-5` |
| Card gap (desktop) | 24px | `gap-6` |
| Section padding (mobile) | 16px | `px-4 py-8` |
| Section padding (desktop) | 24px | `px-6 py-12` |
| Profile to grid gap | 48px (space-12) | `mb-12` |

---

## 5. Components

### 5.1 Cards

**Base Card Styles:**
```tsx
// components/cards/BaseCard.tsx
const baseCardStyles = {
  background: 'bg-card',
  border: 'border border-border',
  radius: 'rounded-[24px]',
  padding: 'p-6',
  shadow: 'shadow-sm hover:shadow-md',
  transition: 'transition-all duration-200',
  hover: 'hover:scale-[1.02]',
}
```

**Size Variants (CSS Grid):**
```css
/* Mobile: all cards full width */
.card-1x1,
.card-1x2,
.card-2x1,
.card-2x2 {
  grid-column: span 1;
}

/* Tablet (2 columns) */
@media (min-width: 640px) {
  .card-1x1 { grid-column: span 1; }
  .card-1x2 { grid-column: span 2; }
  .card-2x1 { grid-column: span 1; grid-row: span 2; }
  .card-2x2 { grid-column: span 2; grid-row: span 2; }
}

/* Desktop (3-4 columns) */
@media (min-width: 1024px) {
  /* Same as tablet but more columns available */
}
```

**Card States:**
- Default: `shadow-sm`, `scale-100`
- Hover: `shadow-md`, `scale-[1.02]`
- Active: `shadow-sm`, `scale-[0.98]`
- Focus: `ring-2 ring-ring ring-offset-2`

### 5.2 Profile Section

**Layout:**
```tsx
<section className="flex flex-col items-center text-center gap-4 px-4 py-12">
  <Avatar size="lg" /> {/* 120px circle */}
  <div className="space-y-2">
    <h1 className="text-2xl font-bold">{name}</h1>
    <p className="text-base text-muted-foreground">{bio}</p>
    {location && (
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        <MapPin size={14} />
        {location}
      </p>
    )}
  </div>
</section>
```

**Avatar Sizes:**
```tsx
const avatarSizes = {
  sm: 'w-16 h-16',  // 64px
  md: 'w-24 h-24',  // 96px
  lg: 'w-30 h-30',  // 120px
}
```

### 5.3 Icons

**Library:** lucide-react  
**Default Size:** 20px (w-5 h-5)  
**Stroke Width:** 2 (default)

```tsx
import { Github, Twitter, Mail } from 'lucide-react'

<Github className="w-5 h-5" />
<Twitter className="w-5 h-5 text-primary" />
```

**Icon Color Usage:**
- Default: `text-foreground`
- Muted: `text-muted-foreground`
- Brand: `text-primary` or `text-accent`

---

## 6. Responsive Design

### 6.1 Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      sm: '640px',   // Mobile landscape / small tablet
      md: '768px',   // Tablet
      lg: '1024px',  // Desktop
      xl: '1280px',  // Large desktop
    },
  },
}
```

### 6.2 Grid Layout

```tsx
<div className="
  grid
  grid-cols-1           /* Mobile: 1 column */
  sm:grid-cols-2        /* Tablet: 2 columns */
  lg:grid-cols-3        /* Desktop: 3 columns */
  xl:grid-cols-4        /* Large: 4 columns */
  gap-4 sm:gap-5 lg:gap-6
  max-w-[1200px]
  mx-auto
  px-4 sm:px-6
">
  {cards}
</div>
```

### 6.3 Touch Targets

**Minimum size:** 44x44px (iOS/Android standard)

All interactive elements (cards, buttons) meet this requirement:
```tsx
className="min-h-[44px] min-w-[44px]"
```

---

## 7. Animation & Motion

### 7.1 Transition Timing

```css
:root {
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 7.2 Animation Guidelines

**Card Hover:**
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
>
  {children}
</motion.div>
```

**Staggered Grid Reveal:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
>
  <Card />
</motion.div>
```

**Reduced Motion:**
```tsx
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

const animation = prefersReducedMotion ? {} : {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}
```

---

## 8. Shadows & Elevation

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

**Usage:**
- Cards at rest: `shadow-sm`
- Cards on hover: `shadow-md`
- Modals/overlays: `shadow-lg`

---

## 9. Border Radius

```css
:root {
  --radius-sm: 0.5rem;   /* 8px */
  --radius: 0.75rem;     /* 12px */
  --radius-md: 1rem;     /* 16px */
  --radius-lg: 1.5rem;   /* 24px */
  --radius-full: 9999px; /* Circles */
}
```

**Component Usage:**
- Cards: 24px (`rounded-[24px]`)
- Buttons: 12px (`rounded-xl`)
- Avatar: 9999px (`rounded-full`)
- Input fields: 8px (`rounded-lg`)

---

## 10. Dark Mode (Future Enhancement)

### 10.1 Dark Palette (Planned)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222 47% 11%;      /* #0f172a */
    --foreground: 210 40% 98%;      /* #f8fafc */
    
    --card: 217 33% 17%;            /* #1e293b */
    --card-foreground: 210 40% 98%;
    
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    
    --border: 217 33% 20%;
    
    /* Primary/accent remain the same */
  }
}
```

### 10.2 Dark Mode Toggle (Phase 2)

Add to profile section:
```tsx
<button onClick={toggleTheme} className="...">
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```

---

## 11. Implementation Checklist

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
} satisfies Config
```

### Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
}

@layer utilities {
  /* Custom utilities */
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## 12. Design Token Export

For use in design tools (Figma, Sketch):

```json
{
  "colors": {
    "primary": "#3b82f6",
    "accent": "#8b5cf6",
    "background": "#ffffff",
    "foreground": "#0f172a"
  },
  "typography": {
    "fontFamily": "Inter",
    "scale": {
      "xs": 12,
      "sm": 14,
      "base": 16,
      "lg": 18,
      "xl": 20,
      "2xl": 24
    }
  },
  "spacing": {
    "unit": 4,
    "scale": [4, 8, 12, 16, 20, 24, 32, 40, 48, 64]
  },
  "borderRadius": {
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 24,
    "full": 9999
  }
}
```

---

## Summary

This design system provides:
- **Consistent visual language** across all components
- **Accessible color system** with WCAG 2.1 AA compliance
- **Flexible theming** via content.json
- **Responsive patterns** that work on all devices
- **Smooth animations** that respect user preferences
- **Performance-optimized** with minimal CSS

Refer to this document when:
- Creating new components
- Customizing the theme
- Ensuring accessibility
- Adding animations
- Making responsive adjustments
