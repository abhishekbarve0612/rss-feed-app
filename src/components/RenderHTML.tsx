import dompurify from 'dompurify'
import { getArticleContentStyles } from '@/lib/utils'

interface RenderHTMLProps {
  html: string
  className?: string
  fontSize: string
  fontFamily: string
  lineHeight?: string
  letterSpacing?: string
}

function RenderHTML({
  html,
  className = '',
  fontSize,
  fontFamily,
  lineHeight,
  letterSpacing,
}: RenderHTMLProps) {
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

  return (
    <div
      className={`${getArticleContentStyles(fontSize, fontFamily, lineHeight, letterSpacing)} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

export default RenderHTML
