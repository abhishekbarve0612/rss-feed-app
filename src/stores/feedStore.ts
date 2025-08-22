import { create } from 'zustand'
import type { FeedOut, Article, ArticleContent } from '@/lib/types'

interface FeedStore {
  feedsBySlug: Record<string, FeedOut>
  feedSlugs: string[]
  selectedFeedSlug: string | null

  articlesByFeedSlug: Record<string, string[]>
  articlesBySlug: Record<string, Article>
  articleContentBySlug: Record<string, ArticleContent>
  isLoading: boolean
  error: string | null

  setFeeds: (feeds: FeedOut[]) => void
  setSelectedFeedSlug: (slug: string | null) => void
  setArticlesByFeedSlug: (feedSlug: string, articles: Article[]) => void
  setArticlesBySlug: (articles: Article[]) => void
  setArticleContentBySlug: (slug: string, content: ArticleContent) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  addFeed: (feed: FeedOut) => void
  updateFeed: (feed: FeedOut) => void
  clearError: () => void

  getFeed: (slug: string) => FeedOut | undefined
  getAllFeedsBySlug: (slug: string) => FeedOut[]
  getSelectedFeed: () => FeedOut | null
  getAllFeeds: () => FeedOut[]
  getAllArticles: () => Article[]
  getAllArticlesByFeedSlug: (feedSlug: string) => Article[]
  getArticleBySlug: (slug: string) => Article | undefined
  getFeedBySlug: (slug: string) => FeedOut | undefined
  getArticleContentBySlug: (slug: string) => ArticleContent | undefined
}

export const useFeedStore = create<FeedStore>((set, get) => ({
  feedsBySlug: {},
  feedSlugs: [],
  selectedFeedSlug: null,
  articlesByFeedSlug: {},
  articlesBySlug: {},
  articleContentBySlug: {},
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

  setArticlesByFeedSlug: (feedSlug, articles) =>
    set((state) => {
      const articleSlugs = articles.map((article) => article.slug)
      const newArticlesBySlug = articles.reduce(
        (acc, article) => {
          acc[article.slug] = article
          return acc
        },
        {} as Record<string, Article>
      )

      return {
        articlesByFeedSlug: { ...state.articlesByFeedSlug, [feedSlug]: articleSlugs },
        articlesBySlug: { ...state.articlesBySlug, ...newArticlesBySlug },
      }
    }),

  setArticlesBySlug: (articles) =>
    set((state) => {
      const newArticlesBySlug = articles.reduce(
        (acc, article) => {
          acc[article.slug] = article
          return acc
        },
        {} as Record<string, Article>
      )

      return {
        articlesBySlug: { ...state.articlesBySlug, ...newArticlesBySlug },
      }
    }),

  setArticleContentBySlug: (slug, content) =>
    set((state) => ({
      articleContentBySlug: { ...state.articleContentBySlug, [slug]: content },
    })),

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
  getAllArticles: () => {
    const { articlesBySlug } = get()
    return Object.values(articlesBySlug)
  },
  getAllArticlesByFeedSlug: (feedSlug) => {
    const { articlesByFeedSlug, articlesBySlug } = get()
    const articleSlugs = articlesByFeedSlug[feedSlug] || []
    return articleSlugs.map((slug) => articlesBySlug[slug]).filter(Boolean)
  },
  getArticleBySlug: (slug) => get().articlesBySlug[slug],
  getFeedBySlug: (slug) => get().feedsBySlug[slug],
  getArticleContentBySlug: (slug) => get().articleContentBySlug[slug],
}))
