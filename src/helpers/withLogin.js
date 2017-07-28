import React, { Component } from 'react'
import { connect } from 'react-redux'

const withLogin = (WrappedComponent) => (
  @connect((state) => ({
    isLogged: !!state.getIn(['user', 'email'])
  }))
  class LoginComponent extends Component {
    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
)

export default withLogin
