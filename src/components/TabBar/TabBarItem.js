// @flow

import React from 'react'
import { Platform } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Icon } from 'react-native-elements'
import glam, { View, TouchableOpacity, Text, withTheme } from 'glamorous-native'
import { withLogin } from '@helpers'
import { ProfileImage } from '@components/Profile'

import type { NavigationRoute } from 'react-navigation/src/TypeDefinition'

type Props = {
  route: NavigationRoute,
  icon: string,
  label: string,
  index: number,
  jumpTo: Function,
  active: boolean,
  theme: Object,
  isLogged: boolean,
  user: Object
}

const CircleImage = glam.image({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 75,
  height: 75
})

const ios = Platform.OS === 'ios'
const profileImageWidth = ios ? 60 : 50

const ProfileComponent = ({route, icon, label, index, jumpTo, active, theme, isLogged, user}: Props) => (
  <View
    backgroundColor='transparent'
    alignItems='center'
    justifyContent='center'
    width={75}
    height={ios ? 70 : 55}
  >
    {
      Platform.OS === 'ios' &&
      <CircleImage source={require('../../../static/images/circle.png')} />
    }
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={jumpTo}
      alignItems='center'
      justifyContent='center'
    >
      {
        !isLogged &&
        <View alignItems='center' justifyContent='center'>
          <Icon
            type='simple-line-icon'
            name='user'
            size={25}
            style={{marginTop: 3}}
            color={active ? theme.colors.secondary : theme.colors.tertiaryLighten}
          />
          <Text
            marginTop={5}
            fontSize={14}
            color={active ? theme.colors.secondary : theme.colors.tertiaryLighten}
          >
            {label}
          </Text>
        </View>
      }
      {
        isLogged &&
        <ProfileImage
          source={user.get('photoURL') ? { uri: user.get('photoURL') } : require('../../../static/images/anonymous-user.jpg')}
          style={{ width: profileImageWidth, height: profileImageWidth, borderRadius: profileImageWidth / 2, borderWidth: 2 }}
        />
      }
    </TouchableOpacity>
  </View>
)

const TabBarItem = ({route, icon, label, index, jumpTo, active, theme}: Props) => (
  <TouchableOpacity activeOpacity={0.7} onPress={jumpTo} flex={1}>
    <View
      flex={1}
      height={55}
      alignItems='center'
      justifyContent='center'
    >
      <Icon
        type='simple-line-icon'
        size={20}
        name={icon}
        color={active ? theme.colors.secondary : theme.colors.tertiaryLighten}
      />
      <Text
        marginTop={2}
        fontSize={14}
        color={active ? theme.colors.secondary : theme.colors.tertiaryLighten}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
)

const enhance = compose(
  withTheme,
  withLogin,
  pure,
  branch(
    ({ index }) => index === 2,
    renderComponent(ProfileComponent)
  )
)

export default enhance(TabBarItem)
