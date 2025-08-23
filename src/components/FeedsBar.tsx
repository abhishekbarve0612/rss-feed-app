import { Loader, ScrollArea, Sidebar } from '@abhishekbarve/components'
import { FaGlobe } from 'react-icons/fa'
import { useStore } from '@/stores/store'
import { FeedList } from './FeedsList'
import { useFeeds } from '@/hooks/useRSSFeed'
import { useEffect } from 'react'
import { useFeedStore } from '@/stores/feedStore'

function FeedsBar() {
  const { sidebarOpen, setSidebarOpen } = useStore()
  const { data: feeds, isLoading, error } = useFeeds()
  const { setFeeds, setLoading, setError } = useFeedStore()

  useEffect(() => {
    if (feeds) {
      console.log('Feeds received from API:', feeds)
      setFeeds(feeds)
    }
  }, [feeds, setFeeds])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    setError(error?.message || null)
  }, [error, setError])
  if (isLoading && !feeds) {
    return <Loader />
  }
  return (
    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} side="right">
      <Sidebar.Header>Feeds</Sidebar.Header>
      <ScrollArea>
        <Sidebar.Body>
          {feeds && feeds.length > 0 ? (
            <FeedList minimal />
          ) : (
            <div className="text-muted-foreground py-8 text-center">
              <FaGlobe className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p className="text-sm">No feeds added yet</p>
              <p className="text-xs">Click "Add Feed" to get started</p>
            </div>
          )}
        </Sidebar.Body>
      </ScrollArea>
    </Sidebar>
  )
}

export default FeedsBar
