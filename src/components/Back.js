import React, { Component } from 'react'
import { pure, compose } from 'recompose'
import { TouchableHighlight } from 'react-native'
import { withNavigation, NavigationActions } from 'react-navigation'

class Back extends Component {
  props: {
    navigation: Object
  }

  constructor (props) {
    super(props)

    this.handlePress = ::this.handlePress
    this.handleLongPress = ::this.handleLongPress
  }

  handlePress () {
    const { navigation } = this.props
    navigation.goBack()
  }

  handleLongPress () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'home' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <TouchableHighlight
        {...this.props}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
      />
    )
  }
}

export default compose(
  withNavigation,
  pure
)(Back)
