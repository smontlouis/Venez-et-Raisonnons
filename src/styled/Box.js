import { styled, ifProp, prop } from '@styled-components'

const Box = styled.View`
  flex-direction: ${ifProp({ row: true }, 'row')};
  margin-top: ${prop('marginTop')};
  margin-bottom: ${prop('marginBottom')}
`

export default Box
