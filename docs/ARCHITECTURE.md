# Architecture Document
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24

---

## 1. System Overview

### 1.1 Architecture Pattern
**Static Site Generation (SSG)** with Next.js App Router

- Pre-rendered pages at build time
- No backend server required for content delivery
- Content sourced from JSON configuration file
- Deployed to edge CDN (Vercel Edge Network)

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Browser                       │
└───────────────────┬─────────────────────────────────┘
                    │ HTTPS
                    ▼
┌─────────────────────────────────────────────────────┐
│              CDN / Edge Network                      │
│              (Vercel Edge)                           │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│           Static HTML + Assets                       │
│   • Pre-rendered HTML pages                          │
│   • Optimized images (WebP, AVIF)                   │
│   • CSS bundles (Tailwind)                          │
│   • JS bundles (React hydration)                    │
└─────────────────────────────────────────────────────┘
                    ▲
                    │ Build Time
┌─────────────────────────────────────────────────────┐
│           Next.js Build Process                      │
│   • Read content.json                                │
│   • Generate static pages                            │
│   • Optimize assets                                  │
│   • Output static files                              │
└───────────────────┬─────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│         Content Source (Git Repo)                    │
│   • content.json (configuration)                     │
│   • /public/images/ (assets)                        │
└─────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```
personal-bento/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main landing page
│   ├── globals.css              # Global styles (Tailwind)
│   └── fonts/                   # Local font files (optional)
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   └── avatar.tsx
│   │
│   ├── profile/                 # Profile section components
│   │   ├── ProfileHeader.tsx   # Avatar + name + bio
│   │   └── ProfileAvatar.tsx
│   │
│   ├── cards/                   # Bento card components
│   │   ├── BaseCard.tsx        # Shared card wrapper
│   │   ├── LinkCard.tsx        # Simple link card
│   │   ├── SocialCard.tsx      # Social media card
│   │   ├── ProjectCard.tsx     # Project showcase card
│   │   ├── ImageCard.tsx       # Image/photo card
│   │   ├── TextCard.tsx        # Text content card
│   │   └── ContactCard.tsx     # Contact/email card
│   │
│   └── grid/
│       └── BentoGrid.tsx        # Main grid layout component
│
├── lib/                          # Utilities and helpers
│   ├── content.ts               # Content loader & validator
│   ├── utils.ts                 # General utilities (cn, etc.)
│   └── schemas.ts               # Zod schemas for validation
│
├── types/                        # TypeScript type definitions
│   └── content.ts               # Content structure types
│
├── public/                       # Static assets
│   ├── images/                  # User images
│   │   ├── avatar.jpg
│   │   └── projects/
│   ├── icons/                   # Custom icons (if needed)
│   └── favicon.ico
│
├── data/                         # Content data
│   └── content.json             # Main configuration file
│
├── config/                       # App configuration
│   └── site.ts                  # Site-wide config (metadata, etc.)
│
├── styles/                       # Additional styles (if needed)
│
├── .github/                      # GitHub Actions (optional)
│   └── workflows/
│       └── deploy.yml
│
├── components.json               # shadcn/ui config
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js configuration
├── package.json
├── .env.local                   # Environment variables
└── README.md
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
Page (app/page.tsx)
│
├── ProfileHeader
│   ├── ProfileAvatar
│   ├── Name
│   ├── Bio
│   └── Location
│
└── BentoGrid
    │
    ├── LinkCard
    ├── SocialCard
    ├── ProjectCard
    ├── ImageCard
    ├── TextCard
    └── ContactCard
```

### 3.2 Component Patterns

#### BaseCard Component (Composition Pattern)
All card types extend from a shared `BaseCard` component that provides:
- Consistent styling (shadows, borders, hover effects)
- Size variants (1x1, 1x2, 2x1, 2x2)
- Click handling
- Accessibility attributes

```typescript
// Pseudo-code structure
<BaseCard size="2x1" href={url} className={customClass}>
  {children}
</BaseCard>
```

#### Card Type Components
Each card type focuses on its specific content:
- **LinkCard:** Icon + label + optional description
- **SocialCard:** Platform icon + username + follower count
- **ProjectCard:** Image + title + description + tech stack
- **ImageCard:** Optimized image with caption
- **TextCard:** Rich text content
- **ContactCard:** Email icon + CTA

---

## 4. Data Flow

### 4.1 Build-Time Data Flow

```
1. Build Process Starts
   ↓
2. lib/content.ts reads data/content.json
   ↓
3. Zod validates structure against schema
   ↓
4. Transform data into typed objects
   ↓
5. Pass data to React components as props
   ↓
6. Components render to static HTML
   ↓
7. Next.js optimizes images
   ↓
8. Output static files to .next/out/
```

### 4.2 Runtime Data Flow (Client-Side)

```
1. User visits page
   ↓
2. CDN serves static HTML
   ↓
3. Browser loads JS bundle
   ↓
4. React hydrates the page
   ↓
5. User clicks card
   ↓
6. Client-side navigation or external link
```

---

## 5. Content Management System

### 5.1 Configuration File (data/content.json)

```json
{
  "profile": {
    "name": "string",
    "bio": "string",
    "avatar": "string (path or URL)",
    "location": "string (optional)"
  },
  "seo": {
    "title": "string",
    "description": "string",
    "ogImage": "string"
  },
  "cards": [
    {
      "id": "string (unique)",
      "type": "link | social | project | image | text | contact",
      "position": "number (for ordering)",
      "size": "1x1 | 1x2 | 2x1 | 2x2",
      "visible": "boolean",
      
      // Type-specific fields
      "title": "string",
      "description": "string",
      "url": "string",
      "icon": "string",
      "image": "string",
      "platform": "string",
      "tags": "string[]"
    }
  ],
  "theme": {
    "primaryColor": "string (hex)",
    "accentColor": "string (hex)",
    "backgroundColor": "string (hex)"
  }
}
```

### 5.2 Content Validation (Zod Schema)

```typescript
// lib/schemas.ts
import { z } from 'zod'

export const CardSchema = z.object({
  id: z.string(),
  type: z.enum(['link', 'social', 'project', 'image', 'text', 'contact']),
  position: z.number(),
  size: z.enum(['1x1', '1x2', '2x1', '2x2']),
  visible: z.boolean().default(true),
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
})

export const ContentSchema = z.object({
  profile: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string(),
    location: z.string().optional(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
  }),
  cards: z.array(CardSchema),
  theme: z.object({
    primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
    accentColor: z.string().regex(/^#[0-9A-F]{6}$/i),
    backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  }),
})
```

---

## 6. Styling Architecture

### 6.1 Tailwind CSS + CSS Variables

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors injected from content.json theme */
    --primary: 221 83% 53%;
    --accent: 262 83% 58%;
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    
    /* Spacing */
    --grid-gap: 1rem;
    --card-radius: 1.5rem;
    
    /* Animation */
    --transition-speed: 200ms;
  }
}
```

### 6.2 Component Styling Strategy

- **Base styles:** Tailwind utility classes
- **Component variants:** Class Variance Authority (CVA) from shadcn/ui
- **Dynamic theming:** CSS variables injected at build time
- **Responsive:** Mobile-first breakpoints (sm, md, lg, xl)

---

## 7. Responsive Design Strategy

### 7.1 Breakpoint System

```typescript
// Tailwind breakpoints
{
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
}
```

### 7.2 Grid Layout Behavior

| Screen Size | Columns | Gap | Max Width |
|-------------|---------|-----|-----------|
| Mobile (<640px) | 1 | 16px | 100% |
| Tablet (640-1024px) | 2 | 20px | 100% |
| Desktop (>1024px) | 3-4 | 24px | 1200px |

### 7.3 Card Size Mapping

- **1x1:** 1 grid cell (square)
- **1x2:** 1 row, 2 columns (landscape)
- **2x1:** 2 rows, 1 column (portrait)
- **2x2:** 2x2 grid cells (large square)

On mobile, all cards collapse to full width.

---

## 8. Performance Optimization

### 8.1 Image Optimization

```typescript
// Using Next.js Image component
<Image
  src={imagePath}
  alt={alt}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  priority={isPriority}
/>
```

- Automatic WebP/AVIF conversion
- Lazy loading for below-the-fold images
- Blur placeholder for LCP improvement
- Responsive srcset generation

### 8.2 Code Splitting

- Automatic route-based splitting (Next.js)
- Dynamic imports for heavy components (if needed)
- Tree-shaking unused code

### 8.3 Bundle Optimization

- Tailwind CSS purging (production)
- Minification (JS, CSS, HTML)
- Brotli/Gzip compression
- Critical CSS inlining

---

## 9. SEO & Meta Tags

### 9.1 Static Metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: {
    type: 'website',
    title: content.seo.title,
    description: content.seo.description,
    images: [content.seo.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title,
    description: content.seo.description,
    images: [content.seo.ogImage],
  },
}
```

### 9.2 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://yoursite.com",
  "image": "https://yoursite.com/avatar.jpg",
  "sameAs": [
    "https://github.com/username",
    "https://twitter.com/username"
  ]
}
```

---

## 10. Accessibility

### 10.1 ARIA Implementation

- Semantic HTML (`<nav>`, `<main>`, `<article>`)
- ARIA labels for icon-only buttons
- Focus management (keyboard navigation)
- Skip links for keyboard users

### 10.2 Color Contrast

- WCAG 2.1 AA compliance (4.5:1 for normal text)
- Validation in Zod schema (optional)
- Dark mode consideration (future)

### 10.3 Keyboard Navigation

- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Enter/Space for activation

---

## 11. Deployment Architecture

### 11.1 Git-Based Deployment

```
Local Development
    ↓ (git push)
GitHub Repository
    ↓ (webhook)
Vercel Build
    ↓ (build success)
Edge Network Deployment
    ↓
Production (yoursite.com)
```

### 11.2 Environment Configuration

```bash
# .env.local (local dev)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Vercel Environment Variables (production)
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## 12. State Management

### 12.1 No Complex State Needed

Since this is a static site with no user interactions requiring state:
- No Redux/Zustand needed
- Content is static at build time
- Theme can use CSS variables (no React context needed)

### 12.2 Future Considerations

If adding interactivity (e.g., theme toggle):
- React Context for theme
- localStorage for persistence
- Minimal state management

---

## 13. Testing Strategy

### 13.1 Type Safety
- TypeScript strict mode
- Zod runtime validation
- Type inference from content schema

### 13.2 Build-Time Validation
- content.json validation fails the build if invalid
- TypeScript compilation catches type errors
- ESLint for code quality

### 13.3 Manual Testing
- Visual regression (screenshot comparison)
- Lighthouse CI (performance, accessibility, SEO)
- Manual testing on devices

---

## 14. Scalability Considerations

### 14.1 Current Constraints
- Static generation scales to ~100 cards comfortably
- Build time increases linearly with image count
- No backend, so no server scaling concerns

### 14.2 Future Scaling Paths

If growth requires it:
1. **Incremental Static Regeneration (ISR)**
   - On-demand revalidation
   - Faster deployments

2. **Dynamic Rendering**
   - Server-side rendering for dynamic content
   - API routes for contact forms

3. **CMS Integration**
   - Headless CMS (Contentful, Sanity)
   - Admin UI for content editing

---

## 15. Security Considerations

### 15.1 Static Site Security
- No backend = smaller attack surface
- Content injection prevented by build-time validation
- XSS prevented by React's escaping

### 15.2 External Links
- `rel="noopener noreferrer"` for external links
- URL validation in Zod schema

### 15.3 Asset Security
- Images served from CDN (Vercel)
- No sensitive data in public directory
- Environment variables for secrets (if needed)

---

## 16. Monitoring & Analytics (Optional)

### 16.1 Basic Analytics
```typescript
// lib/analytics.ts
export function trackCardClick(cardId: string, url: string) {
  // Send to analytics service
  if (typeof window !== 'undefined') {
    // Vercel Analytics, Plausible, or custom
  }
}
```

### 16.2 Performance Monitoring
- Vercel Analytics (automatic)
- Core Web Vitals tracking
- Error boundaries for runtime errors

---

## 17. Extension Points

### 17.1 Planned Extensions (Post-MVP)

1. **Admin UI**
   - Visual content editor
   - Drag-and-drop card reordering
   - Live preview

2. **Dynamic Features**
   - Contact form submission
   - Newsletter signup
   - View counter

3. **Advanced Layouts**
   - Multiple pages
   - Custom layouts per page
   - Animation presets

---

## Appendix: Technology Decisions

### Why Next.js App Router?
- Modern React patterns (Server Components)
- Excellent DX (hot reload, TypeScript)
- Built-in optimization (images, fonts, bundles)
- Seamless Vercel deployment

### Why shadcn/ui?
- Copy-paste components (no npm dependency)
- Built on Radix UI (accessible primitives)
- Tailwind-based (consistent styling)
- Customizable source code

### Why Zod?
- Runtime validation at build time
- Type inference (DRY)
- Excellent error messages
- TypeScript-first

### Why Static Generation?
- Fastest possible load times
- No server costs
- Simple deployment
- Excellent SEO
