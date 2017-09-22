import glamorous, { View } from 'glamorous-native'

const FixedContainer = glamorous(View)((props, theme) => ({
  height: 50,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  borderTopWidth: 1,
  borderTopColor: theme.colors.border,
  backgroundColor: 'white'
}))

export default FixedContainer
