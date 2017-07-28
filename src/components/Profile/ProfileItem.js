// @flow

import React from 'react'
import { Icon } from 'react-native-elements'
import glam from 'glamorous-native'

type Props = {
  icon: string,
  name: string,
  type?: string,
  onPress: Function
}

const Container = glam.touchableOpacity({
  padding: 10,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
})

const StyledText = glam.text((_, theme) => ({
  fontFamily: theme.fonts.secondaryFont,
  color: theme.colors.grey,
  fontSize: 16,
  marginTop: 10
}))

const ProfileItem = ({icon, type, name, onPress}: Props) => (
  <Container onPress={onPress} activeOpacity={0.6}>
    <Icon color='#4E4F4F' size={30} name={icon} type={type} />
    <StyledText>{name.toUpperCase()}</StyledText>
  </Container>
)

export default ProfileItem
