import clsx from 'clsx'
import styles from './footer.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

function Footer({ children, className }: Props) {
  return <div className={clsx(styles.footer, className)}>{children}</div>
}

export default Footer
