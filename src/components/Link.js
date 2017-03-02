import React, { Component, PropTypes } from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import { withNavigation } from '@exponent/ex-navigation'
import { Router } from '../routes'

class Link extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    params: PropTypes.object,
    route: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.handlePress = ::this.handlePress
  }

  handlePress() {
    const { navigator, route, params } = this.props

    navigator.push(Router.getRoute(route, params))
  }

  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.handlePress} />
    )
  }
}

export default withNavigation(Link)
