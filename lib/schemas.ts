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
export type Profile = z.infer<typeof ProfileSchema>
export type SEO = z.infer<typeof SEOSchema>
export type Theme = z.infer<typeof ThemeSchema>
