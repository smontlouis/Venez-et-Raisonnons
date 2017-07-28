import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { Header } from '@src/components'
import { Spacer, Container, Box } from '@ui'
import FireAuth from '@src/helpers/fireAuth'

const Login = ({ isLogged, user, email, password, changeEmail, changePassword, changeUser }) => (
  <Container>
    <Header
      title='Inscription'
    />
    <Box>
      <Spacer size={10} />
      <FormLabel>Nom utilisateur</FormLabel>
      <FormInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={changeUser}
      />
      <FormLabel>Email</FormLabel>
      <FormInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={changeEmail}
      />
      <FormLabel>Mot de passe</FormLabel>
      <FormInput
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={changePassword}
      />
      <Spacer size={20} />
      <Button
        title="S'inscrire"
        onPress={() => FireAuth.register(user, email, password)}
        buttonStyle={{ backgroundColor: '#C22839', borderRadius: 5 }}
      />
    </Box>
  </Container>
)

export default compose(
  withStateHandlers(
    {
      email: '',
      password: '',
      user: ''
    },
    {
      changeEmail: ({ email }) => (value) => ({ email: value }),
      changePassword: ({ password }) => (value) => ({ password: value }),
      changeUser: ({ user }) => (value) => ({ user: value })
    }
  )
)(Login)
