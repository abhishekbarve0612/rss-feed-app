import clsx from 'clsx'
import styles from './badge.module.css'

type Variant = 'default' | 'secondary' | 'success' | 'error' | 'warning'

type Color = 'emerald' | 'amber' | 'rose' | 'violet' | 'slate' | 'orange' | 'red' | 'stone'

const VARIANTS: Record<Variant, Variant> = {
  default: 'default',
  secondary: 'secondary',
  success: 'success',
  error: 'error',
  warning: 'warning',
}

const COLORS: Record<Color, Color> = {
  emerald: 'emerald',
  amber: 'amber',
  rose: 'rose',
  violet: 'violet',
  slate: 'slate',
  orange: 'orange',
  red: 'red',
  stone: 'stone',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
  color?: Color
}

function Badge({
  children,
  variant = VARIANTS.default,
  className = '',
  color = 'emerald',
}: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], styles[color], className)}>
      {children}
    </span>
  )
}

Badge.COLORS = COLORS
Badge.VARIANTS = VARIANTS

export default Badge
