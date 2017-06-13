import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { View } from 'react-native'
import * as BibleActions from '@src/redux/modules/bible'
import {
  Header,
  SelectorButtons
} from '@src/components'
import BibleTabNavigator from './BibleTabNavigator'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabLabel: {
    margin: 8,
    fontSize: 13
  },
  tabIndicator: {
    backgroundColor: '$color.primary'
  }
})

@connect(
  null,
  BibleActions
)
export default class BibleSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    resetTempSelected: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { resetTempSelected } = this.props
    resetTempSelected()
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header title='Livres' />
        <BibleTabNavigator screenProps={{ mainNavigation: navigation }} />
        <SelectorButtons />
      </View>
    )
  }
}
