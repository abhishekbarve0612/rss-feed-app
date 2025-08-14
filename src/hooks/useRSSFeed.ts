import { useState, useEffect, useCallback } from 'react'
import type { RSSFeed, FeedSource } from '@/lib/types'
import { RSSParser } from '@/lib/rssParser'

const STORAGE_KEY = 'rss-feeds'
const SOURCES_KEY = 'rss-sources'
const LAST_UPDATE_KEY = 'rss-last-update'

function useRSSFeeds() {
  const [feeds, setFeeds] = useState<Record<string, RSSFeed>>({})
  const [sources, setSources] = useState<FeedSource[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedFeeds = localStorage.getItem(STORAGE_KEY)
    const savedSources = localStorage.getItem(SOURCES_KEY)

    if (savedFeeds) {
      try {
        setFeeds(JSON.parse(savedFeeds))
      } catch (e) {
        console.error('Error parsing saved feeds:', e)
      }
    }

    if (savedSources) {
      try {
        setSources(JSON.parse(savedSources))
      } catch (e) {
        console.error('Error parsing saved sources:', e)
      }
    }
  }, [])

  const saveFeeds = useCallback((newFeeds: Record<string, RSSFeed>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFeeds))
    setFeeds(newFeeds)
  }, [])

  const saveSources = useCallback((newSources: FeedSource[]) => {
    localStorage.setItem(SOURCES_KEY, JSON.stringify(newSources))
    setSources(newSources)
  }, [])

  const shouldUpdate = useCallback(() => {
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)
    if (!lastUpdate) return true

    const lastUpdateTime = new Date(lastUpdate)
    const now = new Date()
    const hoursSinceUpdate = (now.getTime() - lastUpdateTime.getTime()) / (1000 * 60 * 60)

    return hoursSinceUpdate >= 24 // Update once per day
  }, [])

  const fetchFeed = useCallback(async (source: FeedSource): Promise<RSSFeed | null> => {
    try {
      const feed = await RSSParser.fetchAndParse(source.url)
      return feed
    } catch (error) {
      console.error(`Error fetching feed ${source.title}:`, error)
      return null
    }
  }, [])

  const fetchAllFeeds = useCallback(
    async (force = false) => {
      if (!force && !shouldUpdate()) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const newFeeds: Record<string, RSSFeed> = {}

        for (const source of sources) {
          const feed = await fetchFeed(source)
          if (feed) {
            newFeeds[source.id] = feed
          }
        }

        saveFeeds(newFeeds)
        localStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString())
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch feeds')
      } finally {
        setLoading(false)
      }
    },
    [sources, shouldUpdate, fetchFeed, saveFeeds]
  )

  const addFeedSource = useCallback(
    async (url: string, title?: string) => {
      setLoading(true)
      setError(null)

      try {
        const feed = await RSSParser.fetchAndParse(url)

        const newSource: FeedSource = {
          id: Date.now().toString(),
          url,
          title: title || feed.title,
          lastFetched: new Date().toISOString(),
        }

        const newSources = [...sources, newSource]
        saveSources(newSources)

        const newFeeds = { ...feeds, [newSource.id]: feed }
        saveFeeds(newFeeds)

        return newSource
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to add feed')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [sources, feeds, saveSources, saveFeeds]
  )

  const removeFeedSource = useCallback(
    (sourceId: string) => {
      const newSources = sources.filter((s) => s.id !== sourceId)
      saveSources(newSources)

      const newFeeds = { ...feeds }
      delete newFeeds[sourceId]
      saveFeeds(newFeeds)
    },
    [sources, feeds, saveSources, saveFeeds]
  )

  useEffect(() => {
    if (sources.length > 0) {
      fetchAllFeeds()
    }
  }, [sources.length])

  return {
    feeds,
    sources,
    loading,
    error,
    addFeedSource,
    removeFeedSource,
    refreshFeeds: () => fetchAllFeeds(true),
    shouldUpdate: shouldUpdate(),
  }
}

export default useRSSFeeds
