import { ArticleView } from '@/components/ArticleView'
import { useFeedStore } from '@/stores/feedStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/feed/$slug/article/$article-slug/page')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug, 'article-slug': articleSlug } = Route.useParams()
  const { getAllEntries } = useFeedStore()
  const navigate = useNavigate()
  
  const article = getAllEntries().find((entry) => entry.slug === articleSlug)
  
  if (!article) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Article not found</p>
          <button 
            onClick={() => navigate({ to: '/feed/$slug', params: { slug } })}
            className="text-blue-600 hover:text-blue-800 underline"
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
    />
  )
}
