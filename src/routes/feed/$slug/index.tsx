import { ArticlesList } from '@/components/ArticlesList'
import { useFeedEntries } from '@/hooks/useRSSFeed'
import { useFeedStore } from '@/stores/feedStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/feed/$slug/')({
  component: RouteComponent,
  loader: async ({ params }: { params: { slug: string } }) => {
    return {
      slug: params.slug,
    }
  },
})

function RouteComponent() {
  return (
    <div>
      <FeedEntries />
    </div>
  )
}

function FeedEntries() {
  const { slug } = Route.useLoaderData()
  const { data: entries, isLoading, error } = useFeedEntries(slug)
  const { setFeedEntries, setLoading, setError, setSelectedFeedSlug } = useFeedStore()

  useEffect(() => {
    setSelectedFeedSlug(slug)
  }, [slug, setSelectedFeedSlug])

  useEffect(() => {
    if (entries) {
      setFeedEntries(entries)
    }
  }, [entries, setFeedEntries])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    setError(error?.message || null)
  }, [error, setError])

  return (
    <>
      <h1>Feed Entries</h1>
      <div className="flex flex-1">
        <ArticlesList />
      </div>
    </>
  )
}
