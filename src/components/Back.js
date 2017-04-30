import React, { Component, PropTypes } from 'react'
import {
  TouchableHighlight,
} from 'react-native'
import { withNavigation } from 'react-navigation'

class Back extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.handlePress = ::this.handlePress
  }

  handlePress() {
    const { navigation } = this.props

    navigation.goBack()
  }

  render() {
    return (
      <TouchableHighlight {...this.props} onPress={this.handlePress} />
    )
  }
}

export default withNavigation(Back)
