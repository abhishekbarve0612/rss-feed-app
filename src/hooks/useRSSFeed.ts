import type { FeedOut, ArticleMeta, ArticleContentOut } from '@/lib/types'
import { useGet, usePost } from './useQuery'

export const useFeeds = () => {
  return useGet<FeedOut[]>('/api/feeds/')
}

export const useAddFeed = () => {
  return usePost<FeedOut>('/api/feeds/')
}

export const useFeedEntries = (slug: string) => {
  return useGet<ArticleMeta[]>(`/api/feeds/${slug}/articles`)
}

export const useRefreshFeed = (slug: string) => {
  return usePost<FeedOut>(`/api/feeds/${slug}/refresh`)
}

export const useRefreshAllFeeds = () => {
  return usePost<{ status: string }>('/api/feeds/refresh-all')
}

export const useArticleContent = (sourceSlug: string, articleSlug: string) => {
  return useGet<ArticleContentOut>(`/api/feeds/${sourceSlug}/articles/${articleSlug}`)
}
