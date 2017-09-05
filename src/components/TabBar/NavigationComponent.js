// @flow

import React from 'react'
import { View } from 'glamorous-native'

import type { NavigationAction, NavigationState, NavigationScreenProp, NavigationRoute } from 'react-navigation/src/TypeDefinition'

import TabBarItem from './TabBarItem'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  jumpToIndex: (index: number) => void
}

type MenuItem = {
  label: string,
  icon: string
}

const options: {
  [key: string]: MenuItem,
  topics: MenuItem,
  bible: MenuItem,
  profile: MenuItem,
  lexique: MenuItem,
  more: MenuItem
} = {
  topics: {
    label: 'Thèmes',
    icon: 'docs'
  },
  bible: {
    label: 'Bible',
    icon: 'book-open'
  },
  profile: {
    label: 'Profil',
    icon: 'account-circle'
  },
  lexique: {
    label: 'Lexique',
    icon: 'notebook'
  },
  more: {
    label: 'Plus',
    icon: 'options'
  }
}

const NavigationComponent = ({
  navigation,
  jumpToIndex
}: Props) => {
  const { routes } = navigation.state
  return (
    <View
      backgroundColor='white'
      height={56}
      flexDirection='row'
      alignItems='flex-end'
      borderTopColor='rgba(99, 113, 122, 0.2)'
      borderTopWidth={1}
      shadowOffset={{ width: 0, height: -3 }}
      shadowColor='rgb(99, 113, 122)'
      shadowOpacity={0.1}
      shadowRadius={3}
    >
      {routes.map((route: NavigationRoute, index: number) => (
        <TabBarItem
          key={route.key}
          label={options[route.key].label}
          icon={options[route.key].icon}
          route={route}
          index={index}
          jumpTo={() => jumpToIndex(index)}
          active={index === navigation.state.index}
        />
      ))}
    </View>
  )
}

export default NavigationComponent
