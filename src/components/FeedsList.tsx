import { ScrollArea, Card, Badge, Button } from '@abhishekbarve/components'
import type { RSSItem } from '@/lib/types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaCalendar, FaUser } from 'react-icons/fa6'

interface FeedListProps {
  articles: RSSItem[]
  loading: boolean
  error: string | null
}

export function FeedList({ articles, loading, error }: FeedListProps) {
  if (loading && articles.length === 0) {
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

  if (articles.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No articles available</p>
          <p className="text-muted-foreground text-sm">Add some RSS feeds to get started</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 p-6">
        {articles.map((article) => (
          <Card key={article.id} className="cursor-pointer transition-shadow hover:shadow-md">
            <Card.Content className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
                    {article.title}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {article.description}
                </p>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="h-4 w-4" />
                    {new Date(article.pubDate).toLocaleDateString()}
                  </div>

                  {article.author && (
                    <div className="flex items-center gap-1">
                      <FaUser className="h-4 w-4" />
                      {article.author}
                    </div>
                  )}
                </div>

                {article.categories && article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {article.categories.slice(0, 3).map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {article.categories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.categories.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
