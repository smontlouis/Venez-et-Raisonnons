import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  Text,
  View,
} from 'react-native'

// import * as TopicsActions from '../redux/modules/topics'

import * as auth0 from '../services/auth0'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
})


@connect(
  ({ auth }) => ({
    isLoggedIn: auth.get('isLoggedIn'),
  }),
  null,
)
export default class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      auth0.showLogin()
    }
  }

  componentWillReceiveProps({ isLoggedIn, router }) {
    if (isLoggedIn) {
      router.push('/')
    } else {
      auth0.showLogin()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        LOGIN
        </Text>
      </View>
    )
  }
}
