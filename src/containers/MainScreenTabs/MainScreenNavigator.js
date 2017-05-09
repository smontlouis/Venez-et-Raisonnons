import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabNavigator } from 'react-navigation'

import { globalVariables as global } from '@src/helpers'
import { NavigationComponent } from '../../components/react-native-material-bottom-navigation'

import Topics from './Topics'
import Bible from './Bible'
import LexiqueNavigator from './LexiqueNavigator'
import Favorites from './Favorites'
import More from './More'

const MainScreenNavigator = TabNavigator({
  topics: { screen: Topics },
  bible: { screen: Bible },
  lexique: { screen: LexiqueNavigator },
  favorites: { screen: Favorites },
  more: { screen: More },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    style: { height: 56, elevation: 8, left: 0, bottom: 0, right: 0, borderTopColor: '#EEECEE', borderTopWidth: 1 },
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
        lexique: {
          label: 'Lexique',
          icon: (<Icon size={24} color={global.color.tertiaryLighten} name="omega" />),
          activeIcon: (<Icon size={24} color={global.color.secondary} name="omega" />)
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
