import { Button, Card } from '@abhishekbarve/components'
import type { Article } from '@/lib/types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

interface ArticleCardProps {
  article: Article
  minimal?: boolean
  feedSlug: string
}

function ArticleCard({ article, minimal = false, feedSlug }: ArticleCardProps) {
  return (
    <Card
      className={minimal ? 'p-3' : 'p-4'}
      href={`/feed/${feedSlug}/article/${article.slug}`}
      LinkComponent={Link}
    >
      <Card.Header className="pb-2">
        <Card.Title className={minimal ? 'text-sm' : 'text-base'}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-2 text-lg leading-tight font-semibold">{article.title}</h3>
            {!minimal && (
              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </Card.Title>
      </Card.Header>
      {article.summary && (
        <Card.Content className="pt-0">
          <div
            className={`text-muted-foreground ${minimal ? 'text-xs' : 'text-sm'} line-clamp-3`}
            dangerouslySetInnerHTML={{ __html: article.summary }}
          />
        </Card.Content>
      )}
      <Card.Footer className="text-muted-foreground pt-2 text-xs">
        {new Date(article.published_date).toLocaleDateString()}
      </Card.Footer>
    </Card>
  )
}

export default ArticleCard
