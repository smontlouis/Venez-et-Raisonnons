import glamorous from 'glamorous-native'
import { bindStyles } from 'glam-props'

const { Text: T } = glamorous

const stylesToBind = {
  fontSize: {
    small: 12,
    medium: 18
  },
  lineHeight: {
    small: 16,
    medium: 27
  },
  fontFamily: theme => ({
    primaryFont: theme.fonts.text,
    secondaryFont: theme.fonts.secondaryFont,
    tertiaryFont: theme.fonts.tertiaryFont,
    sansSerif: 'arial'
  }),
  color: theme => ({
    default: theme.colors.default,
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
  ({ flex, underline }) => ({
    ...flex ? { flex: 1 } : {},
    ...underline ? {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: 'black'
    } : {}
  })
)

Text.defaultProps = {
  color: 'default',
  fontSize: 'medium',
  lineHeight: 'medium',
  fontFamily: 'primaryFont'
}

export default Text
