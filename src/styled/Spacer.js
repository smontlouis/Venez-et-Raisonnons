import glam from 'glamorous-native'

const Spacer = glam.view(({size}) => ({
  left: 0,
  right: 0,
  height: 1,
  marginTop: size - 1
}))

export default Spacer
