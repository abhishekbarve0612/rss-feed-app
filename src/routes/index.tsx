import { FeedList } from '@/components/FeedsList'
import useRSSFeeds from '@/hooks/useRSSFeed'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { feeds, loading, error } = useRSSFeeds()
  const [selectedFeedId] = useState<string | null>(null)
  const selectedFeed = selectedFeedId ? feeds[selectedFeedId] : null

  return (
    <div className="flex flex-1">
      <FeedList articles={selectedFeed ? selectedFeed.items : []} loading={loading} error={error} />
    </div>
  )
}
