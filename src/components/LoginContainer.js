import React from 'react'
import { compose, withStateHandlers, lifecycle, pure, branch } from 'recompose'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import * as AppActions from '@src/redux/modules/app'
import { Link } from '@components'
import { Spacer, Box, Text } from '@ui'
import { FireAuth, withLogin } from '@helpers'

const Logout = () => (
  <Box>
    <Button
      title='Se déconnecter'
      onPress={() => FireAuth.logout()}
      buttonStyle={{ backgroundColor: '#C22839', borderRadius: 5 }}
      />
  </Box>
)

const Login = ({ email, password, changeEmail, changePassword }) => (
  <Box>
    <Box hasPadding>
      <Text sansSerif>
        Ne perdez pas vos données ! Connectez-vous dès maintenant.
      </Text>
    </Box>
    <Box hasPadding>
      <FormLabel>Email</FormLabel>
      <FormInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={changeEmail}
      />
      <FormLabel>Password</FormLabel>
      <FormInput
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={changePassword}
      />
      <Spacer size={20} />
      <Button
        title='Se connecter'
        onPress={() => FireAuth.login(email, password)}
        buttonStyle={{ backgroundColor: '#C22839', borderRadius: 5 }}
      />
    </Box>
    <Box hasPadding center>
      <Link route={'register'}>
        <Text sansSerif underline medium>
          Pas de compte ? Inscrivez-vous.
        </Text>
      </Link>
    </Box>
  </Box>
)

export default compose(
  withLogin,
  withNavigation,
  connect(null, { ...AppActions }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (this.props.isLogged !== nextProps.isLogged && nextProps.isLogged) {
        if (!this.props.isModal) {
          this.props.navigation.goBack()
        } else {
          this.props.hideLoginModal()
        }
      }
    }
  }),
  withStateHandlers(
    {
      email: '',
      password: ''
    },
    {
      changeEmail: ({ email }) => (value) => ({ email: value }),
      changePassword: ({ password }) => (value) => ({ password: value })
    }
  ),
  pure,
  branch(
    ({ isLogged }) => isLogged,
  () => Logout
  )
)(Login)
