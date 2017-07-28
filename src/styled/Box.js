import glamorous, { View } from 'glamorous-native'

const Box = glamorous(View)(
  ({ row, flex, center, padding }) => ({
    flex: flex && 1,
    flexDirection: row && 'row',
    ...center ? {
      justifyContent: 'center',
      alignItems: 'center'
    } : {},
    ...padding ? {
      paddingTop: 20,
      paddingBottom: 20
    } : {}
  })
)

export default Box
