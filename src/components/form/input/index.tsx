import clsx from 'clsx'
import styles from './input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: React.ReactNode
}

function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className={clsx(styles.inputContainer, className)}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <input className={clsx(styles.input, icon && styles.inputWithIcon)} {...props} />
    </div>
  )
}

export default Input
