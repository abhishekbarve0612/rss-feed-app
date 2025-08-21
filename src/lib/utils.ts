export const getArticleContentStyles = (
  fontSize: string,
  fontFamily: string,
  lineHeight?: string,
  letterSpacing?: string
) => {
  const leadingClass = lineHeight ? `leading-[${lineHeight}]` : 'leading-relaxed'
  const trackingClass = letterSpacing ? `tracking-[${letterSpacing}]` : 'tracking-normal'
  return `
        ${leadingClass} ${fontSize} ${fontFamily} ${trackingClass}
        
        /* Headings */
        [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-6 [&_h1]:mt-8 [&_h1:first-child]:mt-0 [&_h1]:text-3xl lg:[&_h1]:text-4xl [&_h1]:leading-tight
        [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-8 [&_h2:first-child]:mt-0 [&_h2]:text-2xl lg:[&_h2]:text-3xl [&_h2]:leading-tight
        [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-4 [&_h3]:mt-8 [&_h3:first-child]:mt-0 [&_h3]:text-xl lg:[&_h3]:text-2xl [&_h3]:leading-tight
        [&_h4]:font-bold [&_h4]:text-foreground [&_h4]:mb-4 [&_h4]:mt-6 [&_h4:first-child]:mt-0 [&_h4]:text-lg lg:[&_h4]:text-xl [&_h4]:leading-tight
        [&_h5]:font-bold [&_h5]:text-foreground [&_h5]:mb-3 [&_h5]:mt-6 [&_h5:first-child]:mt-0 [&_h5]:text-base lg:[&_h5]:text-lg [&_h5]:leading-tight
        [&_h6]:font-semibold [&_h6]:text-foreground [&_h6]:mb-3 [&_h6]:mt-6 [&_h6:first-child]:mt-0 [&_h6]:text-sm lg:[&_h6]:text-base [&_h6]:uppercase [&_h6]:tracking-wide
        
        /* Paragraphs */
        [&_p]:mb-6 [&_p]:text-foreground [&_p]:leading-relaxed [&_p:last-child]:mb-0
        
        /* Links */
        [&_a]:text-primary [&_a]:hover:text-primary/80 [&_a]:underline [&_a]:decoration-primary/30 [&_a]:hover:decoration-primary/60 [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:font-medium [&_a:hover]:decoration-2
        
        /* Text formatting */
        [&_strong]:font-semibold [&_strong]:text-foreground
        [&_b]:font-semibold [&_b]:text-foreground
        [&_em]:italic
        [&_i]:italic
        [&_u]:underline [&_u]:decoration-muted-foreground/50 [&_u]:underline-offset-2
        [&_mark]:bg-yellow-200/60 dark:[&_mark]:bg-yellow-400/20 [&_mark]:text-foreground [&_mark]:px-1 [&_mark]:py-0.5 [&_mark]:rounded
        [&_del]:line-through [&_del]:text-muted-foreground
        [&_ins]:underline [&_ins]:decoration-green-500/50 [&_ins]:text-foreground
        
        /* Code */
        [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-foreground [&_code]:border
        [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:border [&_pre]:my-6 [&_pre]:overflow-x-auto
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:leading-relaxed [&_pre_code]:border-0
        
        /* Blockquotes */
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:bg-muted/20 dark:[&_blockquote]:bg-muted/10 [&_blockquote]:rounded-r
        [&_blockquote_p]:mb-0 [&_blockquote_p:last-child]:mb-0
        
        /* Lists */
        [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:list-disc
        [&_ol]:mb-6 [&_ol]:ml-6 [&_ol]:list-decimal
        [&_li]:mb-2 [&_li]:leading-relaxed
        [&_li>ul]:mt-2 [&_li>ul]:mb-0
        [&_li>ol]:mt-2 [&_li>ol]:mb-0
        
        /* Tables */
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:bg-card [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:border
        [&_th]:bg-muted/50 [&_th]:border-b [&_th]:border-border [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground [&_th]:text-sm
        [&_td]:border-b [&_td]:border-border [&_td]:px-4 [&_td]:py-3 [&_td]:text-foreground
        [&_tr:last-child_td]:border-b-0
        [&_tr:nth-child(even)]:bg-muted/20
        
        /* Images and figures */
        [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-6 [&_img]:shadow-sm [&_img]:border [&_img]:border-border/50
        [&_figure]:my-8 [&_figure]:text-center
        [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-2 [&_figcaption]:italic
        
        /* Misc */
        [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border [&_hr]:my-8
        [&_sup]:text-xs [&_sup]:align-super
        [&_sub]:text-xs [&_sub]:align-sub
      `
}
