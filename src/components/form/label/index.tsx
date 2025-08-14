import clsx from 'clsx'
import styles from './label.module.css'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}

function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
    </label>
  )
}

export default Label
