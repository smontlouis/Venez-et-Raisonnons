/* global __DEV__ */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import Toast from 'react-native-simple-toast'
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
      const { user } = this.props
      FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError)

      const provider = user.get('provider')
      if (provider) {
        console.log('Auto-log')
        if (provider.includes('google')) {
          FireAuth.googleLogin()
        } else {
          FireAuth.facebookLogin()
        }
      } else {
        console.log('Anonymous')
        firebase.auth().signInAnonymously().catch(error => console.log(error))
      }
    }

    onLogin = (profile) => this.props.dispatch(UserActions.onUserLoginSuccess(profile))
    onUserChange = (profile) => console.log('user changed')
    onLogout = () => this.props.dispatch(UserActions.onUserLogout())
    onError = (e) => {
      if (e.code === 'auth/internal-error') {
        Toast.show('Une erreur s\'est produite')
      }
      if (e.code === 'auth/account-exists-with-different-credential') {
        Toast.show('Un utilisateur existe déjà avec un autre compte')
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
