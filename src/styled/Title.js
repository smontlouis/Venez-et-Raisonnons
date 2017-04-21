import { styled, bind, prop, globals } from '@styled-components'

const s = bind({
  size: {
    big: 30,
    medium: 21,
  },
  lineHeight: {
    big: 30,
    medium: 24,
  },
  fontFamily: {
    primaryFont: globals.font.title,
    secondaryFont: globals.font.heading,
  },
  color: {
    default: prop('theme.colors.default'),
    reverse: prop('theme.colors.reverse')
  }
})

const Title = styled.Text`
  color: ${s.color};
  font-size: ${s.size};
  font-family: ${s.fontFamily};
  line-height: ${s.lineHeight};
  margin-top: ${prop('marginTop', 0)};
`

Title.defaultProps = {
  color: 'default',
  size: 'big',
  lineHeight: 'big',
  fontFamily: 'primaryFont',
}

export default Title
