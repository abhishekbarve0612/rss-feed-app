import type React from 'react'
import { useState } from 'react'

import toast from '@/lib/toast'
import { Button, Modal, Input, Form, useModalManager } from '@abhishekbarve/components'
import { useAddFeed } from '@/hooks/useRSSFeed'
import { useFeedStore } from '@/stores/feedStore'

const MODAL_ID = 'add-feed-modal'

function AddFeedModal() {
  const [url, setUrl] = useState('')

  const { closeModal } = useModalManager()
  const { mutate: addFeed, isPending: isSubmitting } = useAddFeed()
  const { addFeed: addFeedToStore } = useFeedStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      toast.error('Please enter a valid RSS feed URL')
      return
    }

    addFeed(
      { url: url.trim() },
      {
        onSuccess: (newFeed) => {
          addFeedToStore(newFeed)
          toast.success('RSS feed added successfully')
          setUrl('')
          closeModal(MODAL_ID)
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Failed to add RSS feed')
        },
      }
    )
  }

  return (
    <Modal id={MODAL_ID}>
      <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add RSS Feed</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter the URL of an RSS feed to add it to your reader
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="p-6 sm:max-w-[500px]">
        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Input>
                <Input.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feed URL
                </Input.Label>
                <Input.Field
                  name="url"
                  type="url"
                  placeholder="https://example.com/feed.xml"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </Input>
            </div>
          </div>

          <Modal.Footer className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => closeModal(MODAL_ID)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Feed'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddFeedModal
