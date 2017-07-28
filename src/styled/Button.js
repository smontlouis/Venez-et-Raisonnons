import glam from 'glamorous-native'
import { Button } from 'react-native-elements'

const GlamButton = glam(Button)(
  (props, theme) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  })
)

export default GlamButton
