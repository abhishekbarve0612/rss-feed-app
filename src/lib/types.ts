export type Theme = 'light' | 'dark' | 'sepia'
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
  fontSize: number
  fontFamily: 'serif' | 'sans' | 'mono' | string
  lineHeight: number
  letterSpacing: number
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

export interface Article {
  id: number
  title: string
  link: string
  slug: string
  published_date: string
  summary: string
  created_at: string
  updated_at: string
}

export interface ArticleWithContent extends Article {
  content: ArticleContent
}

export interface ArticleContent {
  id: number
  article_id: number
  plain_text: string
  html_text: string
  created_at: string
  updated_at: string
}
