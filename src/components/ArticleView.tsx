import { useState } from 'react'
import { Button, ScrollArea } from '@abhishekbarve/components'
import { FaExternalLinkAlt, FaCalendar, FaStickyNote } from 'react-icons/fa'
import useReadingSettings from '@/hooks/useReadingSettings'
import type { ArticleWithContent } from '@/lib/types'
import { FaArrowLeft } from 'react-icons/fa6'
import RenderHTML from './RenderHTML'
import { getFontSizeClass, getLetterSpacingClass, getLineHeightClass } from '@/lib/constants'

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
    return getFontSizeClass(settings.fontSize)
  }

  const getLineHeight = () => {
    return getLineHeightClass(settings.lineHeight)
  }

  const getLetterSpacing = () => {
    return getLetterSpacingClass(settings.letterSpacing)
  }

  return (
    <div className="bg-background flex min-h-0 flex-1 flex-col">
      {/* Article Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="link"
              size="sm"
              onClick={onBack}
              className="hover:bg-accent/10 text-muted-foreground transition-colors hover:underline"
            >
              <FaArrowLeft className="h-3.5 w-3.5" />
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
                  <FaExternalLinkAlt className="mr-2 inline-block h-3.5 w-3.5" />
                  Open Original
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotesSidebar(!showNotesSidebar)}
                className="hover:bg-accent/10 text-muted-foreground transition-colors"
              >
                <FaStickyNote className="h-3.5 w-3.5" />
                Notes
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-foreground text-2xl leading-tight font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            <div className="text-muted-foreground flex items-center gap-2 text-sm">
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
      </header>

      <div className="flex min-h-0 flex-1">
        <ScrollArea className="flex-1">
          <div className={`min-h-full transition-colors duration-300 ${getThemeClasses()}`}>
            <article
              className="mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
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
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="space-y-3 text-center">
                    <div className="border-muted-foreground/20 border-t-primary mx-auto h-8 w-8 animate-spin rounded-full border-2" />
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
