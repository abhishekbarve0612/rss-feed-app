import type { FeedOut, Article, ArticleWithContent } from '@/lib/types'
import { useGet, usePost } from './useQuery'

export const useFeeds = () => {
  return useGet<FeedOut[]>('/api/feeds/')
}

export const useAddFeed = () => {
  return usePost<FeedOut>('/api/feeds/')
}

export const useFeedArticles = (slug: string) => {
  return useGet<Article[]>(`/api/feeds/${slug}/articles`)
}

export const useRefreshFeed = (slug: string) => {
  return usePost<FeedOut>(`/api/feeds/${slug}/refresh`)
}

export const useRefreshAllFeeds = () => {
  return usePost<{ status: string }>('/api/feeds/refresh-all')
}

export const useArticleContent = (sourceSlug: string, articleSlug: string) => {
  return useGet<ArticleWithContent>(`/api/feeds/${sourceSlug}/articles/${articleSlug}`)
}
