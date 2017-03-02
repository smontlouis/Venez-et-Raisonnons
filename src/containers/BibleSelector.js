import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  Text,
  View,
} from 'react-native'
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation'
import {
  Header,
  BookSelector,
  ChapterSelector,
} from '../components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabLabel: {
    margin: 8,
    fontSize: 13,
  },
  tabIndicator: {
    backgroundColor: '$color.primary',
  },
})

export default class BibleSelector extends Component {

  renderLabel(param) {
    return (
      <Text style={styles.tabLabel}>{param.route.key.toUpperCase()}</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Livres" />
        <SlidingTabNavigation
          id="sliding-tab-navigation"
          navigatorUID="sliding-tab-navigation"
          initialTab="livres"
          renderLabel={this.renderLabel}
          indicatorStyle={styles.tabIndicator}
        >
          <SlidingTabNavigationItem id="livres">
            <BookSelector />
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="chapitre">
            <ChapterSelector />
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="verset">
            <View><Text>Test 3</Text></View>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>
      </View>
    )
  }
}
