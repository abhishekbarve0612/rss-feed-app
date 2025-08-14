import clsx from 'clsx'
import styles from './header.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

function Header({ children, className }: Props) {
  return <div className={clsx(styles.header, className)}>{children}</div>
}

Header.Left = function HeaderLeft({ children, className = '' }: Props) {
  return <div className={clsx(styles.headerLeft, className)}>{children}</div>
}

Header.Right = function HeaderRight({ children, className = '' }: Props) {
  return <div className={clsx(styles.headerRight, className)}>{children}</div>
}

Header.Icon = function HeaderIcon({ children, className = '' }: Props) {
  return <div className={clsx(styles.headerIcon, className)}>{children}</div>
}

Header.Title = function HeaderTitle({ children, className = '' }: Props) {
  return <h1 className={clsx(styles.headerTitle, className)}>{children}</h1>
}

Header.Subtitle = function HeaderSubtitle({ children, className = '' }: Props) {
  return <p className={clsx(styles.headerSubtitle, className)}>{children}</p>
}

export default Header
