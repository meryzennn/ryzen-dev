# Content Data Schema
## Personal Bento-Style Link Website

**Version:** 1.0  
**Date:** 2026-07-24

---

## 1. Overview

This document defines the complete structure of `data/content.json`, which serves as the single source of truth for all content on your Bento-style website. The schema is validated at build time using Zod, ensuring type safety and catching errors before deployment.

---

## 2. Complete Schema Definition

### 2.1 Root Structure

```json
{
  "profile": { /* Profile object */ },
  "seo": { /* SEO metadata */ },
  "cards": [ /* Array of card objects */ ],
  "theme": { /* Theme customization */ }
}
```

### 2.2 Profile Object

```typescript
profile: {
  name: string          // Display name (max 100 chars)
  bio: string           // Short bio/tagline (max 300 chars)
  avatar: string        // Path to avatar image or URL
  location?: string     // Optional location (max 100 chars)
}
```

**Field Details:**

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `name` | string | Yes | 1-100 chars | "John Doe" |
| `bio` | string | Yes | 1-300 chars | "Full-stack developer & open source enthusiast" |
| `avatar` | string | Yes | Valid path or URL | "/images/avatar.jpg" or "https://..." |
| `location` | string | No | 1-100 chars | "San Francisco, CA" |

### 2.3 SEO Object

```typescript
seo: {
  title: string             // Page title for browser tab & SEO
  description: string       // Meta description for search engines
  ogImage?: string          // Open Graph image URL
  twitterHandle?: string    // Twitter username (without @)
}
```

**Field Details:**

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `title` | string | Yes | 1-60 chars | "John Doe - Developer" |
| `description` | string | Yes | 50-160 chars | "Personal links and portfolio for John Doe, full-stack developer" |
| `ogImage` | string | No | Valid URL | "https://yoursite.com/og-image.jpg" |
| `twitterHandle` | string | No | No @ symbol | "johndoe" |

### 2.4 Card Object

```typescript
card: {
  id: string                // Unique identifier (kebab-case recommended)
  type: CardType            // One of: link, social, project, image, text, contact
  position: number          // Order in grid (0-indexed, ascending)
  size: CardSize            // One of: 1x1, 1x2, 2x1, 2x2
  visible: boolean          // Whether card is displayed (default: true)
  
  // Common fields (usage depends on card type)
  title?: string            // Card title/heading
  description?: string      // Card description/body text
  url?: string              // External link URL
  icon?: string             // Icon name (from lucide-react)
  image?: string            // Image path or URL
  
  // Social card specific
  platform?: string         // Social platform name
  username?: string         // Username on platform
  followers?: string        // Follower count (display string)
  
  // Project card specific
  tags?: string[]           // Technology tags
  featured?: boolean        // Highlight this project
  
  // Contact card specific
  email?: string            // Email address
  subject?: string          // Pre-filled email subject
}
```

**Type Definitions:**

```typescript
type CardType = 'link' | 'social' | 'project' | 'image' | 'text' | 'contact'
type CardSize = '1x1' | '1x2' | '2x1' | '2x2'
```

### 2.5 Theme Object

```typescript
theme: {
  primaryColor: string      // Primary brand color (hex)
  accentColor: string       // Accent/highlight color (hex)
  backgroundColor?: string  // Optional background color (hex)
}
```

**Field Details:**

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `primaryColor` | string | Yes | Valid hex color | "#3b82f6" |
| `accentColor` | string | Yes | Valid hex color | "#8b5cf6" |
| `backgroundColor` | string | No | Valid hex color | "#ffffff" |

---

## 3. Zod Schema Implementation

### 3.1 Complete Zod Schema (lib/schemas.ts)

```typescript
import { z } from 'zod'

// Card type enum
export const CardTypeEnum = z.enum([
  'link',
  'social',
  'project',
  'image',
  'text',
  'contact',
])

// Card size enum
export const CardSizeEnum = z.enum(['1x1', '1x2', '2x1', '2x2'])

// Base card schema with all possible fields
export const CardSchema = z.object({
  id: z.string().min(1).max(50),
  type: CardTypeEnum,
  position: z.number().int().min(0),
  size: CardSizeEnum,
  visible: z.boolean().default(true),
  
  // Common optional fields
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  url: z.string().url().optional(),
  icon: z.string().min(1).max(50).optional(),
  image: z.string().min(1).optional(),
  
  // Social card fields
  platform: z.string().min(1).max(50).optional(),
  username: z.string().min(1).max(100).optional(),
  followers: z.string().min(1).max(20).optional(),
  
  // Project card fields
  tags: z.array(z.string().min(1).max(30)).max(10).optional(),
  featured: z.boolean().optional(),
  
  // Contact card fields
  email: z.string().email().optional(),
  subject: z.string().min(1).max(200).optional(),
})

// Profile schema
export const ProfileSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().min(1).max(300),
  avatar: z.string().min(1),
  location: z.string().min(1).max(100).optional(),
})

// SEO schema
export const SEOSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(50).max(160),
  ogImage: z.string().url().optional(),
  twitterHandle: z.string().min(1).max(15).optional(),
})

// Theme schema with hex color validation
const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i
export const ThemeSchema = z.object({
  primaryColor: z.string().regex(hexColorRegex, 'Must be a valid hex color'),
  accentColor: z.string().regex(hexColorRegex, 'Must be a valid hex color'),
  backgroundColor: z.string().regex(hexColorRegex, 'Must be a valid hex color').optional(),
})

// Root content schema
export const ContentSchema = z.object({
  profile: ProfileSchema,
  seo: SEOSchema,
  cards: z.array(CardSchema).min(1).max(50),
  theme: ThemeSchema,
})

// Type inference
export type Content = z.infer<typeof ContentSchema>
export type Card = z.infer<typeof CardSchema>
export type CardType = z.infer<typeof CardTypeEnum>
export type CardSize = z.infer<typeof CardSizeEnum>
```

### 3.2 Content Loader (lib/content.ts)

```typescript
import fs from 'fs'
import path from 'path'
import { ContentSchema, type Content } from './schemas'

export function loadContent(): Content {
  const contentPath = path.join(process.cwd(), 'data', 'content.json')
  
  try {
    const fileContent = fs.readFileSync(contentPath, 'utf-8')
    const jsonData = JSON.parse(fileContent)
    
    // Validate with Zod
    const validatedContent = ContentSchema.parse(jsonData)
    
    return validatedContent
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in content.json: ${error.message}`)
    }
    
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors
        .map(err => `  - ${err.path.join('.')}: ${err.message}`)
        .join('\n')
      throw new Error(`Content validation failed:\n${formattedErrors}`)
    }
    
    throw error
  }
}
```

---

## 4. Card Type Specifications

### 4.1 Link Card

**Purpose:** Simple link to an external resource

**Required Fields:**
- `id`, `type: "link"`, `position`, `size`
- `title` - Link label
- `url` - Destination URL

**Optional Fields:**
- `description` - Additional context
- `icon` - Icon name (lucide-react)

**Example:**
```json
{
  "id": "github-profile",
  "type": "link",
  "position": 0,
  "size": "1x1",
  "visible": true,
  "title": "GitHub",
  "description": "Check out my code",
  "url": "https://github.com/yourusername",
  "icon": "github"
}
```

### 4.2 Social Card

**Purpose:** Social media profile link with platform branding

**Required Fields:**
- `id`, `type: "social"`, `position`, `size`
- `platform` - Platform name (e.g., "Twitter", "LinkedIn")
- `username` - Username on platform
- `url` - Profile URL

**Optional Fields:**
- `icon` - Override default platform icon
- `followers` - Follower count display

**Example:**
```json
{
  "id": "twitter",
  "type": "social",
  "position": 1,
  "size": "1x1",
  "visible": true,
  "platform": "Twitter",
  "username": "@johndoe",
  "url": "https://twitter.com/johndoe",
  "icon": "twitter",
  "followers": "5.2K"
}
```

### 4.3 Project Card

**Purpose:** Showcase a project with image and description

**Required Fields:**
- `id`, `type: "project"`, `position`, `size`
- `title` - Project name
- `description` - Brief description
- `url` - Project URL (live site or repo)

**Optional Fields:**
- `image` - Project screenshot/thumbnail
- `tags` - Tech stack tags
- `featured` - Highlight flag

**Example:**
```json
{
  "id": "awesome-project",
  "type": "project",
  "position": 2,
  "size": "2x1",
  "visible": true,
  "title": "Awesome Project",
  "description": "A revolutionary app that does amazing things",
  "url": "https://awesome-project.com",
  "image": "/images/projects/awesome.jpg",
  "tags": ["React", "TypeScript", "Next.js"],
  "featured": true
}
```

### 4.4 Image Card

**Purpose:** Display an image or photo

**Required Fields:**
- `id`, `type: "image"`, `position`, `size`
- `image` - Image path or URL

**Optional Fields:**
- `title` - Image caption
- `url` - Link when image is clicked

**Example:**
```json
{
  "id": "photo-1",
  "type": "image",
  "position": 3,
  "size": "1x2",
  "visible": true,
  "image": "/images/workspace.jpg",
  "title": "My workspace setup"
}
```

### 4.5 Text Card

**Purpose:** Display text content (quotes, notes, announcements)

**Required Fields:**
- `id`, `type: "text"`, `position`, `size`
- `description` - Text content

**Optional Fields:**
- `title` - Heading
- `icon` - Decorative icon

**Example:**
```json
{
  "id": "bio-text",
  "type": "text",
  "position": 4,
  "size": "2x1",
  "visible": true,
  "title": "About Me",
  "description": "I build things for the web. Passionate about clean code, user experience, and open source.",
  "icon": "info"
}
```

### 4.6 Contact Card

**Purpose:** Email or contact action

**Required Fields:**
- `id`, `type: "contact"`, `position`, `size`
- `email` - Email address

**Optional Fields:**
- `title` - CTA text (default: "Get in touch")
- `subject` - Pre-filled email subject
- `icon` - Icon (default: "mail")

**Example:**
```json
{
  "id": "contact",
  "type": "contact",
  "position": 5,
  "size": "1x1",
  "visible": true,
  "title": "Get in touch",
  "email": "hello@johndoe.com",
  "subject": "Hello from your website!",
  "icon": "mail"
}
```

---

## 5. Complete Example Configuration

### 5.1 Full Example (data/content.json)

```json
{
  "profile": {
    "name": "John Doe",
    "bio": "Full-stack developer, open source contributor, and coffee enthusiast ☕",
    "avatar": "/images/avatar.jpg",
    "location": "San Francisco, CA"
  },
  "seo": {
    "title": "John Doe - Developer",
    "description": "Personal links and portfolio for John Doe, full-stack developer specializing in React and Node.js",
    "ogImage": "https://yoursite.com/og-image.jpg",
    "twitterHandle": "johndoe"
  },
  "cards": [
    {
      "id": "github",
      "type": "social",
      "position": 0,
      "size": "1x1",
      "visible": true,
      "platform": "GitHub",
      "username": "johndoe",
      "url": "https://github.com/johndoe",
      "icon": "github",
      "followers": "1.2K"
    },
    {
      "id": "twitter",
      "type": "social",
      "position": 1,
      "size": "1x1",
      "visible": true,
      "platform": "Twitter",
      "username": "@johndoe",
      "url": "https://twitter.com/johndoe",
      "icon": "twitter"
    },
    {
      "id": "main-project",
      "type": "project",
      "position": 2,
      "size": "2x2",
      "visible": true,
      "title": "Portfolio Website",
      "description": "My personal portfolio built with Next.js, TypeScript, and Tailwind CSS",
      "url": "https://johndoe.com",
      "image": "/images/projects/portfolio.jpg",
      "tags": ["Next.js", "TypeScript", "Tailwind"],
      "featured": true
    },
    {
      "id": "blog",
      "type": "link",
      "position": 3,
      "size": "1x1",
      "visible": true,
      "title": "Blog",
      "description": "Thoughts on web development",
      "url": "https://blog.johndoe.com",
      "icon": "book-open"
    },
    {
      "id": "contact",
      "type": "contact",
      "position": 4,
      "size": "1x1",
      "visible": true,
      "title": "Get in touch",
      "email": "hello@johndoe.com",
      "subject": "Hello from your website!",
      "icon": "mail"
    }
  ],
  "theme": {
    "primaryColor": "#3b82f6",
    "accentColor": "#8b5cf6",
    "backgroundColor": "#ffffff"
  }
}
```

---

## 6. Validation Error Examples

### 6.1 Common Validation Errors

**Missing Required Field:**
```
Content validation failed:
  - profile.name: Required
```

**Invalid URL:**
```
Content validation failed:
  - cards.0.url: Invalid url
```

**Invalid Hex Color:**
```
Content validation failed:
  - theme.primaryColor: Must be a valid hex color
```

**String Too Long:**
```
Content validation failed:
  - profile.bio: String must contain at most 300 character(s)
```

**Invalid Card Type:**
```
Content validation failed:
  - cards.0.type: Invalid enum value. Expected 'link' | 'social' | 'project' | 'image' | 'text' | 'contact', received 'button'
```

---

## 7. Best Practices

### 7.1 Content Organization

**Card Positioning:**
- Use increments of 1 for position (0, 1, 2, 3...)
- Leave gaps if you plan to insert cards later (0, 10, 20, 30...)
- Most important cards should have lower position numbers

**Card Sizing:**
- `1x1` - Best for social links, simple actions
- `1x2` - Good for horizontal content (quotes, CTAs)
- `2x1` - Ideal for project cards with images
- `2x2` - Feature projects or hero content

**Image Paths:**
- Use relative paths for local images: `"/images/avatar.jpg"`
- Use full URLs for external images: `"https://..."`
- Optimize images before adding (< 500KB recommended)

### 7.2 SEO Optimization

**Title:**
- Keep under 60 characters
- Include your name and primary keywords
- Format: "Name - Role" or "Name | What You Do"

**Description:**
- 50-160 characters (155 ideal)
- Include relevant keywords naturally
- Should entice clicks from search results

**Open Graph Image:**
- 1200x630px recommended
- Include text overlay with your name
- Test with https://www.opengraph.xyz/

### 7.3 Accessibility

**Alt Text:**
- Card titles serve as accessible labels
- Ensure icon names are descriptive
- Profile avatar alt is generated from name

**Color Contrast:**
- Ensure theme colors meet WCAG AA standards
- Test with https://contrast-ratio.com/
- Minimum contrast ratio: 4.5:1 for normal text

### 7.4 Performance

**Image Optimization:**
- Use WebP format when possible
- Keep images under 500KB
- Provide appropriate dimensions (avatar: 400x400, projects: 1200x630)

**Content Size:**
- Keep card descriptions concise (< 200 chars)
- Limit total cards to 20-30 for optimal performance
- Large numbers of cards may slow initial load

---

## 8. Schema Migration (Future)

### 8.1 Version Field (Future Enhancement)

```json
{
  "version": "1.0",
  "profile": { ... }
}
```

When adding breaking changes, increment version and provide migration script.

### 8.2 Migration Strategy

1. Add version field to schema
2. Create migration scripts for each version bump
3. Run migrations automatically at build time
4. Backup old content before migrating

---

## 9. TypeScript Types Reference

### 9.1 Complete Type Definitions (types/content.ts)

```typescript
export type CardType = 'link' | 'social' | 'project' | 'image' | 'text' | 'contact'
export type CardSize = '1x1' | '1x2' | '2x1' | '2x2'

export interface Profile {
  name: string
  bio: string
  avatar: string
  location?: string
}

export interface SEO {
  title: string
  description: string
  ogImage?: string
  twitterHandle?: string
}

export interface BaseCard {
  id: string
  type: CardType
  position: number
  size: CardSize
  visible: boolean
}

export interface LinkCard extends BaseCard {
  type: 'link'
  title: string
  description?: string
  url: string
  icon?: string
}

export interface SocialCard extends BaseCard {
  type: 'social'
  platform: string
  username: string
  url: string
  icon?: string
  followers?: string
}

export interface ProjectCard extends BaseCard {
  type: 'project'
  title: string
  description: string
  url: string
  image?: string
  tags?: string[]
  featured?: boolean
}

export interface ImageCard extends BaseCard {
  type: 'image'
  image: string
  title?: string
  url?: string
}

export interface TextCard extends BaseCard {
  type: 'text'
  description: string
  title?: string
  icon?: string
}

export interface ContactCard extends BaseCard {
  type: 'contact'
  email: string
  title?: string
  subject?: string
  icon?: string
}

export type Card = LinkCard | SocialCard | ProjectCard | ImageCard | TextCard | ContactCard

export interface Theme {
  primaryColor: string
  accentColor: string
  backgroundColor?: string
}

export interface Content {
  profile: Profile
  seo: SEO
  cards: Card[]
  theme: Theme
}
```

---

## Summary

This schema provides:
- **Type safety:** Zod validation at build time
- **Flexibility:** 6 card types for different content
- **Extensibility:** Easy to add new card types
- **Developer experience:** Full TypeScript support
- **User experience:** Simple JSON editing

Refer to this document when:
- Adding new content
- Creating new card types
- Troubleshooting validation errors
- Understanding field requirements
