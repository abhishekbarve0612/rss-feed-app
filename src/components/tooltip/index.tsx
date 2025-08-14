import clsx from 'clsx'
import styles from './tooltip.module.css'

interface Props {
  children: React.ReactNode
  content: string
  className?: string
}

function Tooltip({ children, content, className = '' }: Props) {
  return (
    <div className={clsx(styles.tooltipContainer, className)}>
      {children}
      <div className={styles.tooltip}>{content}</div>
    </div>
  )
}

export default Tooltip
