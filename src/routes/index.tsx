import { FeedList } from '@/components/FeedsList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <FeedList />
    </div>
  )
}
