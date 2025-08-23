import { Button } from '@abhishekbarve/components'
import { FaPlus } from 'react-icons/fa'
import { useModalManager } from '@abhishekbarve/components'

function AddFeedButton() {
  const { openModal } = useModalManager()
  return (
    <Button
      variant="ghost"
      size="sm"
      id="add-feed-button"
      asChild
      onClick={() => openModal('add-feed-modal')}
    >
      <FaPlus />
      Add Feed
    </Button>
  )
}

export default AddFeedButton
