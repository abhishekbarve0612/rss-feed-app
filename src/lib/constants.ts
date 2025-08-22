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

export const getFontSizeValue = (fontSize: number) => {
  switch (fontSize) {
    case FONT_SIZES.small:
      return '0.75rem'
    case FONT_SIZES.medium:
      return '1rem'
    case FONT_SIZES.large:
      return '1.25rem'
    case FONT_SIZES.extraLarge:
      return '1.5rem'
    default:
      return `${fontSize}px`
  }
}

export const getLineHeightValue = (lineHeight: number) => {
  return lineHeight.toString()
}

export const getLetterSpacingValue = (letterSpacing: number) => {
  return `${letterSpacing}rem`
}

export const getFontFamilyValue = (fontFamily: string) => {
  console.log('fontFamily', fontFamily)
  switch (fontFamily) {
    case 'system':
      return 'ui-sans-serif, system-ui, sans-serif'
    case 'serif':
      return 'ui-serif, Georgia, serif'
    case 'sans':
      return 'ui-sans-serif, system-ui, sans-serif'
    case 'mono':
      return 'ui-monospace, monospace'
    default:
      return 'ui-sans-serif, system-ui, sans-serif'
  }
}
