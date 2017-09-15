import glamorous, { View } from 'glamorous-native'

const Box = glamorous(View)(
  ({ row, flex, center, hasPadding }) => ({
    flex: flex && 1,
    flexDirection: row && 'row',
    ...center ? {
      justifyContent: 'center',
      alignItems: 'center'
    } : {},
    ...hasPadding ? {
      paddingTop: 20,
      paddingBottom: 20
    } : {}
  })
)

export default Box
