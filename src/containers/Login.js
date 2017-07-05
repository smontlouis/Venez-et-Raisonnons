import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Text, View, TouchableHighlight } from 'react-native'
import { Header } from '@src/components'

import FireAuth from '@src/helpers/fireAuth'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default class Login extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Header
          title='Connexion'
        />
        <TouchableHighlight onPress={() => FireAuth.googleLogin()}>
          <Text>
            Google Sign-In
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => FireAuth.facebookLogin()}>
          <Text>
            Facebook Sign-In
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => FireAuth.logout()}>
          <Text>
            Logout
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
