import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { LoginContainer } from '@components'

import {
  View,
  ScrollView
} from 'react-native'
import {
  Header
} from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    padding: 25
  }
})

const Connexion = () =>
  <View style={styles.container}>
    <Header
      title='Connexion'
    />
    <ScrollView contentContainerStyle={styles.content}>
      <LoginContainer />
    </ScrollView>

  </View>

export default Connexion
