import glamorous, { Text } from 'glamorous-native'

const Box = glamorous(Text)(
  ({ row }) => row ? { flexDirection: 'row' } : {}
)

export default Box