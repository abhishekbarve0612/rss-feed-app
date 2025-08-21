export interface RSSItem {
  id: string
  title: string
  description: string
  content?: string
  link: string
  pubDate: string
  author?: string
  categories?: string[]
}

export interface RSSFeed {
  title: string
  description: string
  link: string
  items: RSSItem[]
  lastUpdated: string
}

export interface FeedSource {
  id: string
  url: string
  title: string
  lastFetched?: string
}

export interface Highlight {
  id: string
  itemId: string
  text: string
  startOffset: number
  endOffset: number
  note?: string
  createdAt: string
  color: string // added color property for highlight colors
}

export interface ReadingSettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large' | number
  fontFamily: 'serif' | 'sans' | 'mono' | string
  lineHeight: number | 'tight' | 'normal' | 'relaxed' | 'loose'
  letterSpacing: 'extra-tight' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest' | number
  maxWidth: number
  theme: 'light' | 'dark' | 'sepia'
}

export interface FeedOut {
  id: number
  url: string
  slug: string
  title?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface ArticleMeta {
  id: number
  title: string
  summary?: string
  link: string
  slug: string
  published_date: string
  created_at: string
  updated_at: string
  // Additional fields for compatibility
  pubDate?: string
  author?: string
  categories?: string[]
  content?: string
  description?: string
}

// Keep FeedEntryOut as alias for backward compatibility
export type FeedEntryOut = ArticleMeta

export interface ArticleContentOut {
  id: number
  article_id: number
  plain_text: string
  html_text: string
  created_at: string
  updated_at: string
}
