// types/content.ts
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
