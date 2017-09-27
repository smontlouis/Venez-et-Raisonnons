/* global __DEV__ */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SnackBar } from '@components'
import * as UserActions from '@src/redux/modules/user'
import FireAuth from '@src/helpers/fireAuth'

const withFireAuth = (WrappedComponent) => (
  @connect((state) => ({
    user: state.get('user')
  }))
  class FireAuthComponent extends Component {
    constructor (props) {
      super(props)

      FireAuth.init({
        clientID: __DEV__
        ? '237308931723-uo7ots2gjilnj4jebl620v7o2sqe2fuc.apps.googleusercontent.com'
        : '237308931723-ne5fqbjnffj7jp6e29l3oeqp3p6pmtd5.apps.googleusercontent.com',
        scopes: ['openid', 'email', 'profile'],
        shouldFetchBasicProfile: true
      })
    }

    componentDidMount () {
      FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError)
    }

    onLogin = (profile) => this.props.dispatch(UserActions.onUserLoginSuccess(profile))
    onUserChange = (profile) => console.log('user changed')
    onLogout = () => this.props.dispatch(UserActions.onUserLogout())
    onError = (e) => {
      if (e.code === 'auth/internal-error') {
        SnackBar.show('Une erreur s\'est produite')
      }
      if (e.code === 'auth/account-exists-with-different-credential' || e.code === 'auth/email-already-in-use') {
        SnackBar.show('Un utilisateur existe déjà avec un autre compte. Connectez-vous !')
      }
      if (e.code === 'auth/weak-password') {
        SnackBar.show('Le mot de passe est trop court.')
      }
      if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
        SnackBar.show('Mot de passe invalide ou utilisateur inexistant.')
      }
      if (e.code === 'auth/invalid-email') {
        SnackBar.show('Format email invalide.')
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
