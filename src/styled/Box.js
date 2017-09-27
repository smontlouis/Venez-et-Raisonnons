import glamorous, { View } from 'glamorous-native'

const Box = glamorous(View)(
  ({ row, flex, center, padding, paddingAll, grey }) => ({
    flex: flex && 1,
    flexDirection: row && 'row',
    ...center ? {
      justifyContent: 'center',
      alignItems: 'center'
    } : {},
    ...padding ? {
      paddingTop: 20,
      paddingBottom: 20
    } : {},
    ...paddingAll ? {
      padding: 20
    } : {},
    ...grey ? {
      backgroundColor: 'rgba(0,0,0,0.1)'
    } : {}
  })
)

export default Box
