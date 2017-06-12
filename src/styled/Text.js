import { styled, bind, prop, ifProp, globals } from '@styled-components'

const s = bind({
  size: {
    small: 12,
    medium: 18
  },
  lineHeight: {
    small: 16,
    medium: 27
  },
  fontFamily: {
    primaryFont: globals.font.text,
    secondaryFont: globals.font.heading,
    tertiaryFont: globals.font.title_italic
  },
  color: {
    default: prop('theme.colors.default'),
    secondary: prop('theme.colors.secondary'),
    reverse: prop('theme.colors.reverse'),
    tertiary: prop('theme.colors.tertiary')
  }
})

const Text = styled.Text`
  color: ${s.color};
  font-size: ${s.size};
  font-family: ${s.fontFamily};
  line-height: ${s.lineHeight};
  flex: ${ifProp({ flex: true }, 1)};
  background-color: transparent;
`

Text.defaultProps = {
  color: 'default',
  size: 'medium',
  lineHeight: 'medium',
  fontFamily: 'primaryFont'
}

export default Text
