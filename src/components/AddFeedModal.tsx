import type React from 'react'
import { useState } from 'react'

import toast from '@/lib/toast'
import { Button, Modal, Input, Form, useModalManager } from '@abhishekbarve/components'

const MODAL_ID = 'add-feed-modal'

function AddFeedModal() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { closeModal } = useModalManager()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      toast.error('Please enter a valid RSS feed URL')
      return
    }

    setIsSubmitting(true)

    try {
      // await addFeed(url.trim(), title.trim() || undefined)
      toast.success('RSS feed added successfully')
      setUrl('')
      setTitle('')
      closeModal(MODAL_ID)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add RSS feed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal id={MODAL_ID}>
      <Modal.Header>
        <h2>Add RSS Feed</h2>
        <p>Enter the URL of an RSS or Atom feed to add it to your reader.</p>
      </Modal.Header>
      <Modal.Body className="sm:max-w-[425px]">
        <Form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input>
                <Input.Label>Feed URL *</Input.Label>
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
            <div className="grid gap-2">
              <Input>
                <Input.Label>Custom Title (optional)</Input.Label>
                <Input.Field
                  name="title"
                  type="text"
                  placeholder="Leave empty to use feed title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Input>
            </div>
          </div>

          <Modal.Footer>
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
