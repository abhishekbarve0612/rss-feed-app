import { ArticleView } from '@/components/ArticleView'
import { useArticleContent } from '@/hooks/useRSSFeed'
import { useFeedStore } from '@/stores/feedStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/feed/$slug/article/$article-slug/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug, 'article-slug': articleSlug } = Route.useParams()
  const { setArticleContentBySlug } = useFeedStore()
  const { data: article, isLoading, error } = useArticleContent(slug, articleSlug)
  const navigate = useNavigate()

  useEffect(() => {
    if (article) {
      setArticleContentBySlug(articleSlug, article.content)
    }
  }, [article, articleSlug, setArticleContentBySlug])

  if (!article) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Article not found</p>
          <button
            onClick={() => navigate({ to: '/feed/$slug', params: { slug } })}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Back to feed
          </button>
        </div>
      </div>
    )
  }

  return (
    <ArticleView
      article={article}
      onBack={() => navigate({ to: '/feed/$slug', params: { slug } })}
      isLoading={isLoading}
      error={error?.message || null}
    />
  )
}
