import { Platform } from 'react-native'
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
  swipeEnabled: false,
  animationEnabled: true,
  pressColor: 'black',
  tabBarOptions: {
    activeTintColor: global.color.white,
    inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      paddingTop: (Platform.OS === 'ios') ? 15 : 20,
      backgroundColor: global.color.primaryDarken,
    },
    indicatorStyle: {
      backgroundColor: global.color.white,
    }
  }
}

export default TabNavigator(RouteConfigs, TabNavigatorConfig)
