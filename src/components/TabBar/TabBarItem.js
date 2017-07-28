// @flow

import React from 'react'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Icon } from 'react-native-elements'
import glam, { View, TouchableWithoutFeedback, Text, withTheme } from 'glamorous-native'

import type { NavigationRoute } from 'react-navigation/src/TypeDefinition'

type Props = {
  route: NavigationRoute,
  icon: string,
  label: string,
  index: number,
  jumpTo: Function,
  active: boolean,
  theme: Object
}

const ProfileImage = glam.image({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 75,
  height: 75
})

const ProfileComponent = ({route, icon, label, index, jumpTo, active, theme}: Props) => (
  <TouchableWithoutFeedback onPress={jumpTo}>
    <View
      backgroundColor='transparent'
      alignItems='center'
      justifyContent='center'
      width={75}
      height={70}
    >
      <ProfileImage source={require('../../../static/images/circle.png')} />
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
  </TouchableWithoutFeedback>
)

const TabBarItem = ({route, icon, label, index, jumpTo, active, theme}: Props) => (
  <TouchableWithoutFeedback onPress={jumpTo}>
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
  </TouchableWithoutFeedback>
)

const enhance = compose(
  withTheme,
  pure,
  branch(
    ({ index }) => index === 2,
    renderComponent(ProfileComponent)
  )
)

export default enhance(TabBarItem)
