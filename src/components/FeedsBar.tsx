import { Loader, ScrollArea, Sidebar } from '@abhishekbarve/components'
import { FaGlobe } from 'react-icons/fa'
import { useStore } from '@/stores/store'
import { useFeedStore } from '@/stores/feedStore'
import { FeedList } from './FeedsList'

function FeedsBar() {
  const { sidebarOpen, setSidebarOpen } = useStore()
  const { getAllFeeds, isLoading } = useFeedStore()
  const feeds = getAllFeeds()
  if (isLoading && feeds.length === 0) {
    return <Loader />
  }
  return (
    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} side="right">
      <Sidebar.Header>Feeds</Sidebar.Header>
      <ScrollArea>
        <Sidebar.Body>
          {feeds.length > 0 ? (
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
