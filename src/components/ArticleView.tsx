import { useState } from 'react'
import { Button, ScrollArea } from '@abhishekbarve/components'
import { FaExternalLinkAlt, FaCalendar, FaStickyNote } from 'react-icons/fa'
import useReadingSettings from '@/hooks/useReadingSettings'
import type { ArticleWithContent } from '@/lib/types'
import { FaArrowLeft } from 'react-icons/fa6'
import RenderHTML from './RenderHTML'

interface ArticleViewProps {
  article: ArticleWithContent
  isLoading: boolean
  error: string | null
  onBack: () => void
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  const { settings } = useReadingSettings()
  const [showNotesSidebar, setShowNotesSidebar] = useState(false)

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
        return 'font-sans'
    }
  }

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small':
        return 'text-sm'
      case 'medium':
        return 'text-base'
      case 'large':
        return 'text-lg'
      case 'extra-large':
        return 'text-xl'
      default:
        return `text-[${settings.fontSize}px]`
    }
  }

  const getLineHeight = () => {
    switch (settings.lineHeight) {
      case 'tight':
        return '1.25'
      case 'normal':
        return '1.5'
      case 'relaxed':
        return '1.75'
      case 'loose':
        return '2'
      default:
        return String(settings.lineHeight || '1.7')
    }
  }

  const getLetterSpacing = () => {
    switch (settings.letterSpacing) {
      case 'extra-tight':
        return 'tighter'
      case 'tight':
        return 'tight'
      case 'normal':
        return 'normal'
      case 'wide':
        return 'wide'
      case 'wider':
        return 'wider'
      case 'widest':
        return 'widest'
      default:
        return String(settings.letterSpacing || 'normal')
    }
  }

  return (
    <div className="bg-background flex min-h-0 flex-1 flex-col">
      {/* Article Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-accent/10 transition-colors"
            >
              <FaArrowLeft className="mr-2 h-3.5 w-3.5" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-accent/10 transition-colors"
                asChild
              >
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="mr-2 h-3.5 w-3.5" />
                  Open Original
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotesSidebar(!showNotesSidebar)}
                className="hover:bg-accent/10 transition-colors"
              >
                <FaStickyNote className="mr-2 h-3.5 w-3.5" />
                Notes
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-foreground text-2xl leading-tight font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-muted-foreground/70 h-3.5 w-3.5" />
                <time className="font-medium">
                  {new Date(article.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <ScrollArea className="flex-1">
          <div className={`min-h-full transition-colors duration-300 ${getThemeClasses()}`}>
            <article
              className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
              style={{
                maxWidth: `${settings.maxWidth}px`,
              }}
            >
              <RenderHTML
                html={article.content.html_text || article.content.plain_text || ''}
                fontSize={getFontSize()}
                fontFamily={getFontFamily()}
                lineHeight={getLineHeight()}
                letterSpacing={getLetterSpacing()}
              />

              {!article.content.html_text && !article.content.plain_text && (
                <div className="flex items-center justify-center py-16">
                  <div className="space-y-3 text-center">
                    <div className="border-muted-foreground/20 border-t-primary mx-auto h-12 w-12 animate-spin rounded-full border-2" />
                    <p className="text-muted-foreground text-sm">Loading article content...</p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </ScrollArea>

        {showNotesSidebar && (
          <div className="bg-card/50 w-80 border-l backdrop-blur">
            <div className="border-b p-4">
              <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                Notes
              </h3>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm">Notes feature coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
