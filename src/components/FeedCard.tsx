import { Badge, Button } from '@abhishekbarve/components'

import { Card } from '@abhishekbarve/components'
import { FaCalendar, FaExternalLinkAlt, FaRss } from 'react-icons/fa'
import { FeedOut } from '@/lib/types'
import { Link } from '@tanstack/react-router'

interface FeedCardProps {
  feed: FeedOut
  minimal?: boolean
}

function FeedCard({ feed, minimal = false }: FeedCardProps) {
  return (
    <Card
      key={feed.id}
      className="cursor-pointer transition-shadow hover:shadow-md"
      href={`/feed/${feed.slug}`}
      LinkComponent={Link}
    >
      <Card.Content className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
              {feed.title || feed.slug}
            </h3>
            {!minimal && (
              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                <a href={feed.url} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {!minimal && (
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
              {feed.description || 'No description available'}
            </p>
          )}

          {!minimal && (
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
          )}

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {feed.slug}
            </Badge>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default FeedCard
