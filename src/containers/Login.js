import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Button, SocialIcon } from 'react-native-elements'
import { View } from 'react-native'
import { Header } from '@src/components'

import FireAuth from '@src/helpers/fireAuth'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

const Login = ({ isLogged }) => (
  <View style={styles.container}>
    <Header
      title='Connexion'
    />
    {
      !isLogged &&
      <View>
        <SocialIcon
          onPress={() => FireAuth.googleLogin()}
          title='Se connecter avec Google'
          button
          type='google-plus-official'
        />
        <SocialIcon
          onPress={() => FireAuth.facebookLogin()}
          title='Se connecter avec Facebook'
          button
          type='facebook'
        />
      </View>
    }
    {
      isLogged &&
      <Button
        onPress={() => FireAuth.logout()}
        title='Se déconnecter'
      />
    }
  </View>
)

export default compose(
  connect(
    (state) => ({
      isLogged: !!state.getIn(['user', 'email'])
    })
  )
)(Login)
