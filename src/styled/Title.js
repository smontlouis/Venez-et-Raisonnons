import glamorous, { Text } from 'glamorous-native'
import { bindStyles } from 'glam-props'

const stylesToBind = {
  fontSize: {
    medium: 21,
    default: 30
  },
  lineHeight: {
    medium: 24,
    default: 30
  },
  fontFamily: theme => ({
    secondaryFont: theme.fonts.secondaryFont,
    default: theme.fonts.primaryFont
  }),
  color: theme => ({
    reverse: theme.colors.reverse,
    default: theme.colors.default
  })
}

const Title = glamorous(Text)(
  bindStyles(stylesToBind)(s => ({
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    fontFamily: s.fontFamily,
    color: s.color
  })),
  ({ marginTop }) => marginTop ? { marginTop } : {}
)

Title.defaultProps = {
  color: 'default',
  fontSize: 'default',
  lineHeight: 'default',
  fontFamily: 'default'
}

export default Title
