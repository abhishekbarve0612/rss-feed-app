import { create } from 'zustand'
import type { FeedOut, FeedEntryOut } from '@/lib/types'

interface FeedStore {
  feedsBySlug: Record<string, FeedOut>
  feedSlugs: string[]
  selectedFeedSlug: string | null
  entriesById: Record<number, FeedEntryOut>
  entryIds: number[]
  isLoading: boolean
  error: string | null

  setFeeds: (feeds: FeedOut[]) => void
  setSelectedFeedSlug: (slug: string | null) => void
  setFeedEntries: (entries: FeedEntryOut[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  addFeed: (feed: FeedOut) => void
  updateFeed: (feed: FeedOut) => void
  clearError: () => void

  getFeed: (slug: string) => FeedOut | undefined
  getAllFeedsBySlug: (slug: string) => FeedOut[]
  getSelectedFeed: () => FeedOut | null
  getAllFeeds: () => FeedOut[]
  getAllEntries: () => FeedEntryOut[]
}

export const useFeedStore = create<FeedStore>((set, get) => ({
  feedsBySlug: {},
  feedSlugs: [],
  selectedFeedSlug: null,
  entriesById: {},
  entryIds: [],
  isLoading: false,
  error: null,

  setFeeds: (feeds) => {
    console.log('Setting feeds in store:', feeds)
    const feedsBySlug = feeds.reduce(
      (acc, feed) => {
        console.log('Processing feed:', feed)
        acc[feed.slug] = feed
        return acc
      },
      {} as Record<string, FeedOut>
    )
    const feedSlugs = feeds.map((feed) => feed.slug)
    console.log('feedsBySlug:', feedsBySlug)
    console.log('feedSlugs:', feedSlugs)
    set({ feedsBySlug, feedSlugs })
  },

  setSelectedFeedSlug: (slug) => set({ selectedFeedSlug: slug }),

  setFeedEntries: (entries) => {
    const entriesById = entries.reduce(
      (acc, entry) => {
        acc[entry.id] = entry
        return acc
      },
      {} as Record<number, FeedEntryOut>
    )
    const entryIds = entries.map((entry) => entry.id)
    set({ entriesById, entryIds })
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  addFeed: (feed) =>
    set((state) => ({
      feedsBySlug: { ...state.feedsBySlug, [feed.slug]: feed },
      feedSlugs: [...state.feedSlugs, feed.slug],
    })),

  updateFeed: (feed) =>
    set((state) => ({
      feedsBySlug: { ...state.feedsBySlug, [feed.slug]: feed },
    })),

  clearError: () => set({ error: null }),

  getFeed: (slug) => get().feedsBySlug[slug],
  getAllFeedsBySlug: (slug) =>
    Object.values(get().feedsBySlug).filter((feed) => feed.slug === slug),
  getSelectedFeed: () => {
    const { selectedFeedSlug, feedsBySlug } = get()
    return selectedFeedSlug ? feedsBySlug[selectedFeedSlug] || null : null
  },
  getAllFeeds: () => {
    const { feedSlugs, feedsBySlug } = get()
    return feedSlugs.map((slug) => feedsBySlug[slug]).filter(Boolean)
  },
  getAllEntries: () => {
    const { entryIds, entriesById } = get()
    return entryIds.map((id) => entriesById[id]).filter(Boolean)
  },
}))
