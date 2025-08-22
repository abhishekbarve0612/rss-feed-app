import type { Theme } from './types'

export const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
} as const

export const LINE_HEIGHTS = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const

export const LETTER_SPACING = {
  extraTight: 0.05,
  tight: 0.1,
  normal: 0.2,
  wide: 0.3,
  wider: 0.4,
  widest: 0.5,
} as const

export const FONT_OPTIONS = [
  { value: 'system', label: 'System Default' },
  { value: 'serif', label: 'Serif (Times)' },
  { value: 'sans', label: 'Sans Serif (Arial)' },
  { value: 'mono', label: 'Monospace' },
]

export const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'sepia', label: 'Sepia' },
]

export const getFontSizeClass = (fontSize: number) => {
  switch (fontSize) {
    case FONT_SIZES.small:
      return 'text-sm'
    case FONT_SIZES.medium:
      return 'text-base'
    case FONT_SIZES.large:
      return 'text-lg'
    case FONT_SIZES.extraLarge:
      return 'text-xl'
    default:
      return `text-[${fontSize}px]`
  }
}

export const getLineHeightClass = (lineHeight: number) => {
  switch (lineHeight) {
    case LINE_HEIGHTS.tight:
      return 'leading-[1.25]'
    case LINE_HEIGHTS.normal:
      return 'leading-[1.5]'
    case LINE_HEIGHTS.relaxed:
      return 'leading-[1.75]'
    case LINE_HEIGHTS.loose:
      return 'leading-[2]'
    default:
      return `leading-[${lineHeight}px]`
  }
}

export const getLetterSpacingClass = (letterSpacing: number) => {
  switch (letterSpacing) {
    case LETTER_SPACING.extraTight:
      return 'tracking-tighter'
    case LETTER_SPACING.tight:
      return 'tracking-tight'
    case LETTER_SPACING.normal:
      return 'tracking-normal'
    case LETTER_SPACING.wide:
      return 'tracking-wide'
    case LETTER_SPACING.wider:
      return 'tracking-wider'
    case LETTER_SPACING.widest:
      return 'tracking-widest'
    default:
      return `tracking-[${letterSpacing}px]`
  }
}
