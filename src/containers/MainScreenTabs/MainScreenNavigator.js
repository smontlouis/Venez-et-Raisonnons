import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EIcon from 'react-native-vector-icons/Octicons'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'

import { globalVariables as global } from '@src/helpers'

import Topics from './Topics'
import Bible from './Bible'
import Search from './Search'
import Favorites from './Favorites'
import More from './More'

const MainScreenNavigator = TabNavigator({
  topics: { screen: Topics },
  bible: { screen: Bible },
  search: { screen: Search },
  favorites: { screen: Favorites },
  more: { screen: More },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    style: { height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0, borderTopColor: '#EEECEE', borderTopWidth: 1 },
    bottomNavigationOptions: {
      activeLabelColor: global.color.secondary,
      labelColor: global.color.tertiaryLighten,
      rippleColor: 'black',
      backgroundColor: 'white',
      tabs: {
        topics: {
          label: 'Accueil',
          icon: (<Icon size={24} color={global.color.tertiaryLighten} name="home" />),
          activeIcon: (<Icon size={24} color={global.color.secondary} name="home" />)
        },
        bible: {
          label: 'Bible',
          icon: (<Icon size={24} color={global.color.tertiaryLighten} name="book-open-page-variant" />),
          activeIcon: (<Icon size={24} color={global.color.secondary} name="book-open-page-variant" />)
        },
        search: {
          label: 'Chercher',
          icon: (<EIcon size={22} color={global.color.tertiaryLighten} name="search" />),
          activeIcon: (<EIcon size={22} color={global.color.secondary} name="search" />)
        },
        favorites: {
          label: 'Favoris',
          icon: (<Icon size={24} color={global.color.tertiaryLighten} name="bookmark" />),
          activeIcon: (<Icon size={24} color={global.color.secondary} name="bookmark" />)
        },
        more: {
          label: 'Plus',
          icon: (<Icon size={24} color={global.color.tertiaryLighten} name="menu" />),
          activeIcon: (<Icon size={24} color={global.color.secondary} name="menu" />)
        },
      }
    }
  }
})

export default MainScreenNavigator
