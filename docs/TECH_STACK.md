# Technology Stack & Decision Rationale
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24

---

## 1. Core Stack Overview

| Category | Technology | Version | Why? |
|----------|-----------|---------|------|
| **Framework** | Next.js | 14+ (App Router) | Modern React patterns, excellent DX, built-in optimizations |
| **Language** | TypeScript | 5.0+ | Type safety, better DX, catches errors at compile time |
| **UI Components** | shadcn/ui | Latest | Copy-paste components, full control, Tailwind-based |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first, fast development, excellent performance |
| **Icons** | lucide-react | Latest | Consistent style, tree-shakeable, extensive collection |
| **Validation** | Zod | 3.22+ | Runtime validation, type inference, great error messages |
| **Animations** | Framer Motion | 11+ (Optional) | Smooth animations, declarative API, performant |

---

## 2. Framework Decision: Next.js 14 (App Router)

### Why Next.js?
```
✅ Static Site Generation (SSG) built-in
✅ Image optimization (WebP, AVIF, responsive)
✅ Font optimization (next/font)
✅ Excellent developer experience
✅ Zero-config TypeScript support
✅ Built-in routing
✅ Server Components (future-proof)
✅ Seamless Vercel deployment
✅ Large community & ecosystem
```

### Why App Router (vs Pages Router)?
- **Modern:** Latest React patterns (Server Components)
- **Better DX:** Co-located layouts, loading states, error boundaries
- **Future-proof:** This is the future of Next.js
- **Better for SSG:** Simpler data fetching patterns
- **Metadata API:** Cleaner SEO/meta tag handling

### Alternatives Considered

#### Astro
- **Pros:** Even faster (less JavaScript), component-agnostic
- **Cons:** Smaller ecosystem, less React-focused, overkill for single-page site
- **Verdict:** Too opinionated for this use case

#### Gatsby
- **Pros:** Great for static sites, GraphQL layer
- **Cons:** Slower builds, heavier, GraphQL overhead unnecessary
- **Verdict:** Next.js is faster and simpler

#### Plain React (Vite)
- **Pros:** Lightweight, fast dev server
- **Cons:** No built-in SSG, manual routing, no image optimization
- **Verdict:** Too much manual work

---

## 3. Language: TypeScript

### Why TypeScript over JavaScript?

```typescript
// Type safety catches errors at build time
type CardType = 'link' | 'social' | 'project' | 'image' | 'text' | 'contact'

interface Card {
  id: string
  type: CardType
  position: number
  // ... TypeScript prevents typos and wrong types
}

// vs JavaScript where this would fail at runtime:
const card = { typ: 'link' } // Typo not caught!
```

### Benefits
- **Autocomplete:** Better IDE experience
- **Refactoring:** Rename with confidence
- **Documentation:** Types are living documentation
- **Fewer bugs:** Catch errors before runtime
- **Zod integration:** Type inference from schemas

### Configuration
```json
// tsconfig.json (strict mode)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

---

## 4. UI Library: shadcn/ui

### Why shadcn/ui?

```
✅ Copy-paste components (you own the code)
✅ Built on Radix UI (accessible primitives)
✅ Tailwind-based (consistent with our stack)
✅ Customizable (modify source directly)
✅ No npm bloat (components in your repo)
✅ Tree-shakeable (only include what you use)
✅ Excellent TypeScript support
```

### Components We'll Use
- `Card` - Base card component
- `Avatar` - Profile image
- `Button` - Interactive elements (optional)
- `Tooltip` - Hover information (optional)

### Alternatives Considered

#### Material-UI (MUI)
- **Pros:** Comprehensive, battle-tested
- **Cons:** Large bundle size, opinionated styling, harder to customize
- **Verdict:** Too heavy for this project

#### Chakra UI
- **Pros:** Great DX, accessible, themeable
- **Cons:** Runtime CSS-in-JS (performance), different paradigm from Tailwind
- **Verdict:** Conflicts with Tailwind approach

#### Headless UI
- **Pros:** Lightweight, unstyled primitives
- **Cons:** More manual work, less batteries-included than shadcn
- **Verdict:** shadcn builds on similar primitives but adds styling

---

## 5. Styling: Tailwind CSS

### Why Tailwind?

```
✅ Utility-first (fast development)
✅ Purges unused CSS (tiny production bundle)
✅ Consistent design system (spacing, colors)
✅ Responsive utilities (mobile-first)
✅ JIT compiler (instant rebuild)
✅ No naming fatigue (no BEM, no CSS modules)
✅ Works perfectly with shadcn/ui
```

### Configuration Strategy

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Inject from content.json at build time
        primary: 'hsl(var(--primary))',
        accent: 'hsl(var(--accent))',
      },
      borderRadius: {
        'card': 'var(--card-radius)',
      },
      gridTemplateColumns: {
        'bento': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
}
```

### Alternatives Considered

#### CSS Modules
- **Pros:** Scoped styles, standard CSS
- **Cons:** Slower development, naming overhead, larger CSS files
- **Verdict:** Tailwind is faster for rapid prototyping

#### Styled Components / Emotion
- **Pros:** CSS-in-JS, dynamic styling
- **Cons:** Runtime cost, larger bundle, React Server Components issues
- **Verdict:** Not compatible with modern Next.js patterns

#### Plain CSS
- **Pros:** No dependencies, full control
- **Cons:** Much slower development, no design system, maintenance overhead
- **Verdict:** Too slow for this project

---

## 6. Icons: lucide-react

### Why lucide-react?

```tsx
import { Github, Twitter, Mail } from 'lucide-react'

<Github className="w-6 h-6" /> // Tree-shaken, only imported icons in bundle
```

```
✅ Consistent design (all icons match)
✅ Tree-shakeable (small bundle)
✅ 1000+ icons
✅ TypeScript support
✅ Customizable (size, color, stroke width)
✅ React-specific (optimized for React)
```

### Alternatives Considered

#### React Icons
- **Pros:** Multiple icon sets in one package
- **Cons:** Larger bundle, inconsistent styles across sets
- **Verdict:** lucide is more cohesive

#### Heroicons
- **Pros:** Beautiful, by Tailwind team
- **Cons:** Smaller collection (~200 icons)
- **Verdict:** lucide has more variety

#### Custom SVGs
- **Pros:** Full control
- **Cons:** Manual maintenance, no ecosystem
- **Verdict:** lucide is good enough

---

## 7. Validation: Zod

### Why Zod?

```typescript
// Define schema once, get types + validation
const CardSchema = z.object({
  id: z.string(),
  type: z.enum(['link', 'social', 'project']),
  url: z.string().url(), // Validates URL format
})

// Type inference (DRY)
type Card = z.infer<typeof CardSchema>

// Runtime validation
const result = CardSchema.safeParse(data)
if (!result.success) {
  console.error(result.error.format()) // Detailed error messages
}
```

### Benefits
- **Build-time validation:** Fail fast if content.json is invalid
- **Type inference:** No duplicate type definitions
- **Great errors:** Pinpoint exactly what's wrong
- **Composable:** Build complex schemas from simple ones

### Alternatives Considered

#### Yup
- **Pros:** Similar API, popular
- **Cons:** Worse TypeScript integration, less active development
- **Verdict:** Zod is TypeScript-first

#### JSON Schema + AJV
- **Pros:** Standard format, fast validation
- **Cons:** Separate type definitions, verbose, no type inference
- **Verdict:** Zod is more ergonomic

#### Manual validation
- **Pros:** No dependency
- **Cons:** Error-prone, no type safety, verbose code
- **Verdict:** Zod is worth it

---

## 8. Animation: Framer Motion (Optional)

### Why Framer Motion?

```tsx
import { motion } from 'framer-motion'

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  <Card />
</motion.div>
```

### Benefits
- **Declarative:** Animation in JSX
- **Performant:** GPU-accelerated, 60fps
- **Gestures:** Hover, tap, drag built-in
- **Layout animations:** Automatic layout transitions

### When to Use
- Card hover effects
- Staggered grid animations
- Smooth transitions between states
- Micro-interactions

### Alternatives

#### CSS Transitions
- **Pros:** No JavaScript, lightweight
- **Cons:** Less control, no gesture support
- **Verdict:** Use for simple hovers, Framer for complex animations

#### React Spring
- **Pros:** Physics-based, very smooth
- **Cons:** Steeper learning curve
- **Verdict:** Framer Motion is easier for this use case

---

## 9. Development Tools

### Package Manager: pnpm (Recommended)

```
✅ Fastest install times
✅ Disk space efficient (content-addressable store)
✅ Strict dependency resolution (prevents phantom dependencies)
✅ Drop-in replacement for npm
```

**Alternative:** npm or yarn (also fine)

### Linting & Formatting

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Git Hooks: Husky + lint-staged (Optional)

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## 10. Deployment: Vercel (Recommended)

### Why Vercel?

```
✅ Made by Next.js creators (best integration)
✅ Zero-config deployment
✅ Automatic HTTPS
✅ Edge network (fast global delivery)
✅ Preview deployments (every PR)
✅ Generous free tier
✅ Environment variables management
✅ Built-in analytics
✅ One-click rollbacks
```

### Deployment Flow

```
1. Push to GitHub
   ↓
2. Vercel auto-detects Next.js
   ↓
3. Builds and deploys
   ↓
4. Preview URL generated
   ↓
5. Merge to main → Production deploy
```

### Alternatives Considered

#### Netlify
- **Pros:** Similar features, good DX
- **Cons:** Slightly worse Next.js integration
- **Verdict:** Vercel is the gold standard for Next.js

#### Cloudflare Pages
- **Pros:** Fast edge network, generous free tier
- **Cons:** Some Next.js features not fully supported
- **Verdict:** Good alternative, but Vercel is safer

#### GitHub Pages
- **Pros:** Free, simple
- **Cons:** No SSG support (static HTML only), manual build process
- **Verdict:** Not suitable for Next.js

---

## 11. Optional Enhancements (Post-MVP)

### Analytics: Vercel Analytics or Plausible

**Vercel Analytics**
- Built-in, no configuration
- Core Web Vitals tracking
- Privacy-friendly (no cookies)

**Plausible**
- Open-source alternative
- More detailed insights
- Self-hostable

### Contact Form: Resend or Formspree

**Resend**
- Modern email API
- Great DX
- Free tier (100 emails/day)

**Formspree**
- Form backend as a service
- No code needed
- Free tier (50 submissions/month)

### CMS (Future): Sanity or Contentful

**Sanity**
- Real-time collaboration
- Customizable editor
- Great DX for developers

**Contentful**
- Enterprise-ready
- Great API
- More mature ecosystem

---

## 12. File Structure & Organization

```
components/
├── ui/              # shadcn components (copy-pasted)
├── profile/         # Profile-specific components
├── cards/           # Card type components
└── grid/            # Layout components

lib/
├── content.ts       # Content loader & validator
├── utils.ts         # Utility functions (cn, etc.)
└── schemas.ts       # Zod schemas

types/
└── content.ts       # Type definitions

data/
└── content.json     # Single source of truth

public/
├── images/          # User-uploaded images
└── icons/           # Favicons, etc.
```

---

## 13. Dependencies Breakdown

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    
    // Styling
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    
    // UI & Icons
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    
    // Validation
    "zod": "^3.23.0",
    
    // Animation (optional)
    "framer-motion": "^11.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    
    // Linting & Formatting
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

### Bundle Size Estimates

| Package | Size (minified + gzipped) |
|---------|---------------------------|
| next + react | ~90 KB |
| tailwindcss (production) | ~5-15 KB (purged) |
| lucide-react (5 icons) | ~5 KB |
| zod | ~15 KB |
| framer-motion | ~30 KB (optional) |
| **Total** | **~145 KB** (without Framer) |

---

## 14. Performance Optimizations

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/images/avatar.jpg"
  alt="Profile"
  width={200}
  height={200}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/..." // Low-quality placeholder
  priority // For above-the-fold images
/>
```

- Automatic WebP/AVIF conversion
- Responsive images (srcset)
- Lazy loading (below the fold)

### Font Optimization

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

- Self-hosted Google Fonts (no external requests)
- FOUT prevention (font display: swap)
- Variable fonts for multiple weights

### Code Splitting

- Automatic route-based splitting (Next.js)
- Dynamic imports for heavy components (if needed)
- Tree-shaking unused code

---

## 15. Security Considerations

### Content Security

```typescript
// Validate all URLs in content.json
const urlSchema = z.string().url().refine(
  (url) => {
    // Prevent javascript: and data: URLs
    return !url.startsWith('javascript:') && !url.startsWith('data:')
  },
  { message: 'Invalid URL protocol' }
)
```

### External Links

```tsx
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer" // Prevent window.opener access
>
  Link
</a>
```

### Environment Variables

```bash
# .env.local (never commit)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ANALYTICS_ID=your_analytics_id
```

---

## 16. Browser Support

### Target Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Android (last 2 versions)

### Progressive Enhancement
- Works without JavaScript (static HTML)
- Enhanced with JavaScript (interactions, animations)
- Fallbacks for older browsers (no modern CSS grid → still readable)

---

## 17. Summary: Why This Stack?

### Decision Matrix

| Criteria | Score | Rationale |
|----------|-------|-----------|
| **Development Speed** | 9/10 | Tailwind + shadcn = rapid prototyping |
| **Performance** | 10/10 | Static generation, optimized assets |
| **Maintainability** | 9/10 | TypeScript, clear structure, copy-paste components |
| **Scalability** | 8/10 | Easy to add features, no major refactors needed |
| **Learning Curve** | 7/10 | Next.js + Tailwind are popular, good docs |
| **Cost** | 10/10 | Free tier for everything (Vercel, etc.) |
| **Future-Proof** | 9/10 | Modern stack, active ecosystem |

### The Bottom Line

This stack is:
- **Fast to develop:** Tailwind + shadcn + TypeScript
- **Fast to load:** Static generation + Next.js optimizations
- **Easy to update:** JSON configuration file
- **Free to host:** Vercel free tier
- **Modern & maintainable:** Latest React patterns
- **Proven:** Battle-tested stack used by thousands

**Perfect fit for a personal Bento-style link website.**
