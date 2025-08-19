import { FeedList } from '@/components/FeedsList'
import { useFeeds } from '@/hooks/useRSSFeed'
import { useFeedStore } from '@/stores/feedStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: feeds, isLoading, error } = useFeeds()
  const { setFeeds, setLoading, setError } = useFeedStore()

  useEffect(() => {
    if (feeds) {
      setFeeds(feeds)
    }
  }, [feeds, setFeeds])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    setError(error?.message || null)
  }, [error, setError])

  return (
    <div className="flex flex-1">
      <FeedList />
    </div>
  )
}
