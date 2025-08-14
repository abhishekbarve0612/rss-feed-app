import clsx from 'clsx'
import styles from './button.module.css'
import type { ButtonSize, ButtonVariant } from './button.types'
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.constants'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  [key: string]: unknown
}

const Button = ({
  children,
  onClick,
  className = '',
  variant = BUTTON_VARIANTS.default,
  size = BUTTON_SIZES.default,
  disabled = false,
  ...props
}: ButtonProps) => {
  const variantClasses = BUTTON_VARIANTS[variant]
  const sizeClasses = BUTTON_SIZES[size]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, styles[variantClasses], styles[sizeClasses], className)}
      {...props}
    >
      {children}
    </button>
  )
}

Button.VARIANTS = BUTTON_VARIANTS
Button.SIZES = BUTTON_SIZES

export default Button
