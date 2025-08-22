import {
  getFontSizeValue,
  getLineHeightValue,
  getLetterSpacingValue,
  getFontFamilyValue,
} from './constants'

export const getArticleContentStyles = (
  fontSize: number | string,
  fontFamily: string,
  lineHeight?: number | string,
  letterSpacing?: number | string
) => {
  const fontSizeVal = typeof fontSize === 'number' ? getFontSizeValue(fontSize) : fontSize
  const fontFamilyVal = getFontFamilyValue(fontFamily)
  const lineHeightVal =
    typeof lineHeight === 'number' ? getLineHeightValue(lineHeight) : lineHeight || '1.6'
  const letterSpacingVal =
    typeof letterSpacing === 'number'
      ? getLetterSpacingValue(letterSpacing)
      : letterSpacing || 'normal'

  return {
    '--article-font-size': fontSizeVal,
    '--article-font-family': fontFamilyVal,
    '--article-line-height': lineHeightVal,
    '--article-letter-spacing': letterSpacingVal,
  }
}
