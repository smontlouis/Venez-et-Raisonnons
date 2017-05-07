import { TabNavigator, TabBarTop } from 'react-navigation'
import { globalVariables as global } from '@src/helpers'
import {
  BookSelector,
  ChapterSelector,
  VerseSelector,
} from '@src/components'

const RouteConfigs = {
  livres: { screen: BookSelector },
  chapitre: { screen: ChapterSelector },
  verset: { screen: VerseSelector }
}

const TabNavigatorConfig = {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  pressColor: 'black',
  tabBarOptions: {
    activeTintColor: global.color.primary,
    inactiveTintColor: global.color.darkGrey,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: global.color.primary,
    }
  }
}

export default TabNavigator(RouteConfigs, TabNavigatorConfig)
