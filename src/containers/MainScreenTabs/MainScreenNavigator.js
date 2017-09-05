import { TabNavigator } from 'react-navigation'

import { NavigationComponent } from '@components'
import Topics from './Topics'
import Bible from './Bible'
import Profile from './Profile'
import LexiqueNavigator from './LexiqueNavigator'
import More from './More'

const MainScreenNavigator = TabNavigator({
  topics: { screen: Topics },
  bible: { screen: Bible },
  profile: { screen: Profile },
  lexique: { screen: LexiqueNavigator },
  more: { screen: More }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false
})

export default MainScreenNavigator
