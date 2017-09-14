/* global __DEV__ */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'
import * as AppActions from '@src/redux/modules/app'
import FireAuth from '@src/helpers/fireAuth'

const withFireAuth = (WrappedComponent) => (
  @connect((state) => ({
    user: state.get('user')
  }))
  class FireAuthComponent extends Component {
    componentDidMount () {
      FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError)
    }

    onLogin = (profile) => this.props.dispatch(AppActions.onUserLoginSuccess(profile))
    onUserChange = (profile) => console.log('user changed')
    onLogout = () => this.props.dispatch(AppActions.onUserLogout())
    onError = (e) => {
      if (e.code === 'auth/internal-error') {
        Toast.show('Une erreur s\'est produite')
      }
      if (e.code === 'auth/account-exists-with-different-credential' || e.code === 'auth/email-already-in-use') {
        Toast.show('Un utilisateur existe déjà avec un autre compte. Connectez-vous !')
      }
      if (e.code === 'auth/weak-password') {
        Toast.show('Le mot de passe est trop court.')
      }
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
        Toast.show('Mot de passe invalide ou utilisateur inexistant.')
      }
      if (e.code === 'auth/invalid-email') {
        Toast.show('Format email invalide.')
      }
      console.log('Error', e)
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
)

export default withFireAuth
