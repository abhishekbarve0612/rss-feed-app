import { Button } from '@abhishekbarve/components'
import { HiRefresh } from 'react-icons/hi'
import { useRefreshFeed, useRefreshAllFeeds } from '@/hooks/useRSSFeed'
import { useFeedStore } from '@/stores/feedStore'
import toast from '@/lib/toast'

function RefreshFeedButton() {
  const { selectedFeedSlug } = useFeedStore()
  const { mutate: refreshFeed } = useRefreshFeed(selectedFeedSlug || '')
  const { mutate: refreshAllFeeds } = useRefreshAllFeeds()

  const handleRefresh = () => {
    console.log('selectedFeedSlug', selectedFeedSlug)
    if (selectedFeedSlug) {
      refreshFeed(undefined, {
        onSuccess: () => {
          toast.success('Feed refreshed successfully!')
        },
        onError: () => {
          toast.error('Failed to refresh feed')
        },
      })
    } else {
      refreshAllFeeds(undefined, {
        onSuccess: () => {
          toast.success('All feeds refreshed successfully!')
        },
        onError: () => {
          toast.error('Failed to refresh feeds')
        },
      })
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleRefresh}>
      <HiRefresh />
      Refresh
    </Button>
  )
}

export default RefreshFeedButton
