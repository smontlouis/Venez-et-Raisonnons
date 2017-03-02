import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native'
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation'
import * as BibleActions from '../redux/modules/bible'
import {
  Header,
  BookSelector,
  ChapterSelector,
  VerseSelector,
  SelectorButtons,
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

@connect(
  null,
  BibleActions,
)
export default class BibleSelector extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    resetTempSelected: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { resetTempSelected } = this.props
    resetTempSelected()
  }

  renderLabel(param) {
    return (
      <Text style={styles.tabLabel}>{param.route.key.toUpperCase()}</Text>
    )
  }

  render() {
    const {
      navigation,
      navigator,
    } = this.props
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
            <BookSelector navigation={navigation} />
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="chapitre">
            <ChapterSelector navigation={navigation} />
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="verset">
            <VerseSelector navigator={navigator} />
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>
        <SelectorButtons />
      </View>
    )
  }
}