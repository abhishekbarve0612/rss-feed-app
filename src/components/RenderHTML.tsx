import dompurify from 'dompurify'
import { getArticleContentStyles } from '@/lib/utils'
import { useStore } from '@/stores/store'

interface RenderHTMLProps {
  html: string
  className?: string
}

function RenderHTML({ html, className = '' }: RenderHTMLProps) {
  const sanitizedHtml = dompurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'i',
      'b',
      'mark',
      'del',
      'ins',
      'sub',
      'sup',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'dl',
      'dt',
      'dd',
      'blockquote',
      'pre',
      'code',
      'a',
      'img',
      'figure',
      'figcaption',
      'table',
      'thead',
      'tbody',
      'tr',
      'td',
      'th',
      'div',
      'span',
      'section',
      'article',
      'aside',
      'nav',
      'hr',
    ],
    ALLOWED_ATTR: [
      'href',
      'src',
      'alt',
      'title',
      'class',
      'id',
      'target',
      'rel',
      'width',
      'height',
      'loading',
    ],
  })

  const { settings } = useStore()

  const { fontSize, fontFamily, lineHeight, letterSpacing } = settings

  console.log(fontSize, fontFamily, lineHeight, letterSpacing)

  const baseStyles = getArticleContentStyles(fontSize, fontFamily, lineHeight, letterSpacing)

  return (
    <div
      className={`article-content ${className}`}
      style={
        {
          ...baseStyles,
          '--heading-color': 'var(--foreground)',
          '--link-color': 'var(--primary)',
          '--muted-color': 'var(--muted-foreground)',
          '--border-color': 'var(--border)',
          '--code-bg': 'var(--muted)',
        } as React.CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

export default RenderHTML
