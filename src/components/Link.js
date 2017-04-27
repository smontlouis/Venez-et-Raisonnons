import React, { Component, PropTypes } from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import { withNavigation } from 'react-navigation'

class Link extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    params: PropTypes.object,
    route: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.handlePress = ::this.handlePress
  }

  handlePress() {
    const { navigation, route, params } = this.props
    console.log(route, params)
    navigation.navigate(route, params)
  }

  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.handlePress} />
    )
  }
}

export default withNavigation(Link)
