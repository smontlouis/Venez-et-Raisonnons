import glamorous from 'glamorous-native'
import { bindStyles } from 'glam-props'

const { Text: T } = glamorous

const stylesToBind = {
  fontSize: {
    small: 12,
    medium: 14,
    default: 18
  },
  lineHeight: {
    small: 16,
    medium: 20,
    default: 27
  },
  fontFamily: theme => ({
    serif: theme.fonts.text,
    sansSerif: 'arial',
    secondaryFont: theme.fonts.secondaryFont,
    tertiaryFont: theme.fonts.tertiaryFont
  }),
  color: theme => ({
    default: theme.colors.default,
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    reverse: theme.colors.reverse,
    tertiary: theme.colors.tertiary
  })
}

const Text = glamorous(T)(
  {
    backgroundColor: 'transparent'
  },
  bindStyles(stylesToBind)(s => ({
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    fontFamily: s.fontFamily,
    color: s.color
  })),
  ({ flex, underline, disabled }) => ({
    ...flex ? { flex: 1 } : {},
    ...underline ? {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: 'black'
    } : {},
    ...disabled ? { opacity: 0.7 } : {}
  })
)

Text.defaultProps = {
  color: 'default',
  fontSize: 'default',
  lineHeight: 'default',
  fontFamily: 'serif'
}

export default Text
