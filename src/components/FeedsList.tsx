import { ScrollArea, Card, Badge, Button } from '@abhishekbarve/components'
import { useFeedStore } from '@/stores/feedStore'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaCalendar, FaRss } from 'react-icons/fa6'

export function FeedList() {
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
          <Card key={feed.id} className="cursor-pointer transition-shadow hover:shadow-md">
            <Card.Content className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
                    {feed.title || feed.slug}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                    <a href={feed.url} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {feed.description || 'No description available'}
                </p>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="h-4 w-4" />
                    {new Date(feed.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-1">
                    <FaRss className="h-4 w-4" />
                    RSS Feed
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {feed.slug}
                  </Badge>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
