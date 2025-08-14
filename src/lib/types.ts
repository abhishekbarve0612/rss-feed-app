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
  fontFamily: string
  lineHeight: number
  maxWidth: number
  theme: 'light' | 'dark' | 'sepia'
}
