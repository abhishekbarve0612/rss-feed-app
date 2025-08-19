import { useState } from 'react'
import { Button, ScrollArea, Badge } from '@abhishekbarve/components'
import { FaExternalLinkAlt, FaCalendar, FaUser, FaStickyNote } from 'react-icons/fa'
import useReadingSettings from '@/hooks/useReadingSettings'
import type { FeedEntryOut } from '@/lib/types'
import { FaArrowLeft } from 'react-icons/fa6'

interface ArticleViewProps {
  article: FeedEntryOut
  onBack: () => void
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  const { settings } = useReadingSettings()
  const [showNotesSidebar, setShowNotesSidebar] = useState(false)

  const formatContent = (content: string) => {
    // Basic HTML sanitization and formatting
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  }

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100'
      case 'sepia':
        return 'bg-amber-50 text-amber-900'
      default:
        return 'bg-white text-gray-900'
    }
  }

  const getFontFamily = () => {
    switch (settings.fontFamily) {
      case 'serif':
        return 'font-serif'
      case 'sans':
        return 'font-sans'
      case 'mono':
        return 'font-mono'
      default:
        return ''
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Article Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="mb-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" size="sm">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt className="mr-2 h-4 w-4" />
              Open Original
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNotesSidebar(!showNotesSidebar)}
          >
            <FaStickyNote className="mr-2 h-4 w-4" />
            Notes
          </Button>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl leading-tight font-bold">{article.title}</h1>

          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <FaCalendar className="h-4 w-4" />
              {new Date(article.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>

            {article.author && (
              <div className="flex items-center gap-1">
                <FaUser className="h-4 w-4" />
                {article.author}
              </div>
            )}
          </div>

          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.categories.map((category: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content Area with Notes Sidebar */}
      <div className="flex flex-1">
        {/* Article Content */}
        <ScrollArea className="flex-1">
          <div className={`transition-colors duration-200 ${getThemeClasses()}`}>
            <article
              className={`mx-auto px-6 py-8 ${getFontFamily()}`}
              style={{ maxWidth: `${settings.maxWidth}px` }}
            >
              {formatContent(article.content || article.description)}
            </article>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
