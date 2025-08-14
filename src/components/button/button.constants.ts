import type { ButtonSize, ButtonVariant } from './button.types'

export const BUTTON_VARIANTS: Record<ButtonVariant, ButtonVariant> = {
  ghost: 'ghost',
  default: 'default',
  link: 'link',
}

export const BUTTON_SIZES: Record<ButtonSize, ButtonSize> = {
  default: 'default',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}
