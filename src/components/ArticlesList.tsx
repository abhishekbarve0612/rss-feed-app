import { ScrollArea } from '@abhishekbarve/components'
import { useFeedStore } from '@/stores/feedStore'
import ArticleCard from './ArticleCard'

interface ArticlesListProps {
  minimal?: boolean
}

export function ArticlesList({ minimal = false }: ArticlesListProps) {
  const { getAllEntries, isLoading, error } = useFeedStore()
  const entries = getAllEntries()
  
  console.log('articles', entries)
  
  if (isLoading && entries.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading articles</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No articles available</p>
          <p className="text-muted-foreground text-sm">Articles will appear here when feeds are loaded</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 p-6">
        {entries.map((entry) => (
          <ArticleCard key={entry.id} article={entry} minimal={minimal} />
        ))}
      </div>
    </ScrollArea>
  )
}