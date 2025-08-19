import type { FeedOut, FeedEntryOut } from '@/lib/types'
import { useGet, usePost } from './useQuery'

export const useFeeds = () => {
  return useGet<FeedOut[]>('/api/feeds/')
}

export const useAddFeed = () => {
  return usePost<FeedOut>('/api/feeds/')
}

export const useFeedEntries = (slug: string) => {
  return useGet<FeedEntryOut[]>(`/api/feeds/${slug}/entries`)
}

export const useRefreshFeed = (slug: string) => {
  return usePost<FeedOut>(`/api/feeds/${slug}/refresh`)
}

export const useRefreshAllFeeds = () => {
  return usePost<{ status: string }>('/api/feeds/refresh-all')
}
