import { ScrollArea } from '@abhishekbarve/components'
import { useFeedStore } from '@/stores/feedStore'
import FeedCard from './FeedCard'

interface FeedListProps {
  minimal?: boolean
}

export function FeedList({ minimal = false }: FeedListProps) {
  const { getAllFeeds, isLoading, error } = useFeedStore()
  const feeds = getAllFeeds()
  if (isLoading && feeds.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading feeds...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading feeds</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (feeds.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No feeds available</p>
          <p className="text-muted-foreground text-sm">Add some RSS feeds to get started</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 p-6">
        {feeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} minimal={minimal} />
        ))}
      </div>
    </ScrollArea>
  )
}
