import { TabNavigator, TabBarTop } from 'react-navigation'
import { globalVariables as global } from '@src/helpers'
import { LexiqueGrec, LexiqueHebreu } from '@src/containers'

const RouteConfigs = {
  lexiqueGrec: { screen: LexiqueGrec },
  lexiqueHebreu: { screen: LexiqueHebreu },
}

const TabNavigatorConfig = {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  // swipeEnabled: true,
  animationEnabled: true,
  pressColor: 'black',
  tabBarOptions: {
    activeTintColor: global.color.white,
    inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      paddingTop: global.paddingTop,
      backgroundColor: global.color.primaryDarken,
    },
    indicatorStyle: {
      backgroundColor: global.color.white,
    }
  }
}

export default TabNavigator(RouteConfigs, TabNavigatorConfig)
