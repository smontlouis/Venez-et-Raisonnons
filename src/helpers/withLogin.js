// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type ClassComponent<P> = Class<React$Component<void, P, void>>

const withLogin = <P: Object>(WrappedComponent: ClassComponent<P>): ClassComponent<P> => {
  class LoginComponent extends Component {
    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return connect((state: Object) => ({
    isLogged: !!state.getIn(['user', 'email']),
    user: state.get('user')
  }))(LoginComponent)
}

export default withLogin
