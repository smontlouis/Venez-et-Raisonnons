import { TabNavigator } from 'react-navigation'

import { NavigationComponent } from '@components'
import Topics from './Topics'
import Bible from './Bible'
import Profile from './Profile'
import LexiqueNavigator from './LexiqueNavigator'
import More from './More'

// const MainScreenNavigator = TabNavigator({
//   topics: { screen: Topics },
//   bible: { screen: Bible },
//   lexique: { screen: LexiqueNavigator },
//   favorites: { screen: Favorites },
//   more: { screen: More }
// }, {
//   tabBarComponent: NavigationComponent,
//   tabBarPosition: 'bottom',
//   swipeEnabled: false,
//   animationEnabled: true,
//   tabBarOptions: {
//     style: { height: 56, elevation: 8, left: 0, bottom: 0, right: 0, borderTopColor: '#EEECEE', borderTopWidth: 1 },
//     bottomNavigationOptions: {
//       activeLabelColor: global.color.secondary,
//       labelColor: global.color.tertiaryLighten,
//       rippleColor: 'black',
//       backgroundColor: 'white',
//       tabs: {
//         topics: {
//           label: 'Accueil',
//           icon: (<Icon size={24} color={global.color.tertiaryLighten} name='home' />),
//           activeIcon: (<Icon size={24} color={global.color.secondary} name='home' />)
//         },
//         bible: {
//           label: 'Bible',
//           icon: (<Icon size={24} color={global.color.tertiaryLighten} name='book-open-page-variant' />),
//           activeIcon: (<Icon size={24} color={global.color.secondary} name='book-open-page-variant' />)
//         },
//         lexique: {
//           label: 'Lexique',
//           icon: (<Icon size={24} color={global.color.tertiaryLighten} name='omega' />),
//           activeIcon: (<Icon size={24} color={global.color.secondary} name='omega' />)
//         },
//         favorites: {
//           label: 'Favoris',
//           icon: (<Icon size={24} color={global.color.tertiaryLighten} name='bookmark' />),
//           activeIcon: (<Icon size={24} color={global.color.secondary} name='bookmark' />)
//         },
//         more: {
//           label: 'Plus',
//           icon: (<Icon size={24} color={global.color.tertiaryLighten} name='menu' />),
//           activeIcon: (<Icon size={24} color={global.color.secondary} name='menu' />)
//         }
//       }
//     }
//   }
// })

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
