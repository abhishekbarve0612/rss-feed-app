import type { RSSFeed, RSSItem } from '@/lib/types'

export class RSSParser {
  static async fetchAndParse(url: string): Promise<RSSFeed> {
    try {
      const response = await fetch(`/api/rss-proxy?url=${encodeURIComponent(url)}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.statusText}`)
      }

      const xmlText = await response.text()
      return this.parseXML(xmlText)
    } catch (error) {
      console.error('Error fetching RSS feed:', error)
      throw error
    }
  }

  private static parseXML(xmlText: string): RSSFeed {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlText, 'text/xml')

    // Check for parsing errors
    const parserError = doc.querySelector('parsererror')
    if (parserError) {
      throw new Error('Invalid XML format')
    }

    // Try RSS 2.0 format first
    let channel = doc.querySelector('rss channel')
    if (!channel) {
      // Try Atom format
      channel = doc.querySelector('feed')
      if (channel) {
        return this.parseAtomFeed(doc)
      }
    }

    if (!channel) {
      throw new Error('Unsupported feed format')
    }

    return this.parseRSSFeed(doc, channel)
  }

  private static parseRSSFeed(doc: Document, channel: Element): RSSFeed {
    const title = channel.querySelector('title')?.textContent || 'Unknown Feed'
    const description = channel.querySelector('description')?.textContent || ''
    const link = channel.querySelector('link')?.textContent || ''

    const items: RSSItem[] = []
    const itemElements = channel.querySelectorAll('item')

    itemElements.forEach((item, index) => {
      const itemTitle = item.querySelector('title')?.textContent || `Item ${index + 1}`
      const itemDescription = item.querySelector('description')?.textContent || ''
      const itemContent = item.querySelector('content\\:encoded')?.textContent || itemDescription
      const itemLink = item.querySelector('link')?.textContent || ''
      const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString()
      const author =
        item.querySelector('author')?.textContent || item.querySelector('dc\\:creator')?.textContent

      const categories: string[] = []
      item.querySelectorAll('category').forEach((cat) => {
        const categoryText = cat.textContent
        if (categoryText) categories.push(categoryText)
      })

      items.push({
        id: `${Date.now()}-${index}`,
        title: itemTitle,
        description: this.stripHtml(itemDescription),
        content: itemContent,
        link: itemLink,
        pubDate,
        author: author || undefined,
        categories: categories.length > 0 ? categories : undefined,
      })
    })

    return {
      title,
      description,
      link,
      items,
      lastUpdated: new Date().toISOString(),
    }
  }

  private static parseAtomFeed(doc: Document): RSSFeed {
    const feed = doc.querySelector('feed')
    if (!feed) throw new Error('Invalid Atom feed')

    const title = feed.querySelector('title')?.textContent || 'Unknown Feed'
    const description = feed.querySelector('subtitle')?.textContent || ''
    const linkEl = feed.querySelector('link[rel="alternate"]') || feed.querySelector('link')
    const link = linkEl?.getAttribute('href') || ''

    const items: RSSItem[] = []
    const entries = feed.querySelectorAll('entry')

    entries.forEach((entry, index) => {
      const itemTitle = entry.querySelector('title')?.textContent || `Item ${index + 1}`
      const summary = entry.querySelector('summary')?.textContent || ''
      const content = entry.querySelector('content')?.textContent || summary
      const entryLink = entry.querySelector('link')?.getAttribute('href') || ''
      const published =
        entry.querySelector('published')?.textContent ||
        entry.querySelector('updated')?.textContent ||
        new Date().toISOString()
      const author = entry.querySelector('author name')?.textContent

      items.push({
        id: `${Date.now()}-${index}`,
        title: itemTitle,
        description: this.stripHtml(summary),
        content,
        link: entryLink,
        pubDate: published,
        author: author || undefined,
      })
    })

    return {
      title,
      description,
      link,
      items,
      lastUpdated: new Date().toISOString(),
    }
  }

  private static stripHtml(html: string): string {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }
}
