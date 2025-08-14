import clsx from 'clsx'
import styles from './card.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function Card({ children, className = '', onClick }: Props) {
  return (
    <div className={clsx(styles.card, className)} onClick={onClick}>
      {children}
    </div>
  )
}

Card.Header = function Header({ children, className = '' }: Props) {
  return <div className={clsx(styles.header, className)}>{children}</div>
}

Card.Title = function Title({ children, className = '' }: Props) {
  return <h3 className={clsx(styles.title, className)}>{children}</h3>
}

Card.Content = function Content({ children, className = '' }: Props) {
  return <div className={clsx(styles.content, className)}>{children}</div>
}

Card.Footer = function Footer({ children, className = '' }: Props) {
  return <div className={clsx(styles.footer, className)}>{children}</div>
}

export default Card
