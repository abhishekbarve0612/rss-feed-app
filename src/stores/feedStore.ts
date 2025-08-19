import { create } from 'zustand'
import type { FeedOut, FeedEntryOut } from '@/lib/types'

interface FeedStore {
  feedsById: Record<number, FeedOut>
  feedIds: number[]
  selectedFeedId: number | null
  entriesById: Record<number, FeedEntryOut>
  entryIds: number[]
  isLoading: boolean
  error: string | null
  
  setFeeds: (feeds: FeedOut[]) => void
  setSelectedFeedId: (feedId: number | null) => void
  setFeedEntries: (entries: FeedEntryOut[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  addFeed: (feed: FeedOut) => void
  updateFeed: (feed: FeedOut) => void
  clearError: () => void
  
  getFeed: (id: number) => FeedOut | undefined
  getSelectedFeed: () => FeedOut | null
  getAllFeeds: () => FeedOut[]
  getAllEntries: () => FeedEntryOut[]
}

export const useFeedStore = create<FeedStore>((set, get) => ({
  feedsById: {},
  feedIds: [],
  selectedFeedId: null,
  entriesById: {},
  entryIds: [],
  isLoading: false,
  error: null,
  
  setFeeds: (feeds) => {
    const feedsById = feeds.reduce((acc, feed) => {
      acc[feed.id] = feed
      return acc
    }, {} as Record<number, FeedOut>)
    const feedIds = feeds.map(feed => feed.id)
    set({ feedsById, feedIds })
  },
  
  setSelectedFeedId: (feedId) => set({ selectedFeedId: feedId }),
  
  setFeedEntries: (entries) => {
    const entriesById = entries.reduce((acc, entry) => {
      acc[entry.id] = entry
      return acc
    }, {} as Record<number, FeedEntryOut>)
    const entryIds = entries.map(entry => entry.id)
    set({ entriesById, entryIds })
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  addFeed: (feed) => set((state) => ({
    feedsById: { ...state.feedsById, [feed.id]: feed },
    feedIds: [...state.feedIds, feed.id]
  })),
  
  updateFeed: (feed) => set((state) => ({
    feedsById: { ...state.feedsById, [feed.id]: feed }
  })),
  
  clearError: () => set({ error: null }),
  
  getFeed: (id) => get().feedsById[id],
  getSelectedFeed: () => {
    const { selectedFeedId, feedsById } = get()
    return selectedFeedId ? feedsById[selectedFeedId] || null : null
  },
  getAllFeeds: () => {
    const { feedIds, feedsById } = get()
    return feedIds.map(id => feedsById[id]).filter(Boolean)
  },
  getAllEntries: () => {
    const { entryIds, entriesById } = get()
    return entryIds.map(id => entriesById[id]).filter(Boolean)
  }
}))