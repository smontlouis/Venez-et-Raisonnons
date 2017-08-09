// @flow

import React, { Component } from 'react'
import getDB from '@src/helpers/database'

import { type Verse } from '../types'
type ClassComponent<P, S> = Class<React$Component<void, P, S>>
type State = {
  isLoading: boolean,
  res:Array<Verse>
}

const withSQLRequest = <P: Object>(SQLRequestFunction: (P) => string) => (WrappedComponent: ClassComponent<P, State>): ClassComponent<P, State> => (
  class SQLComponent extends Component {
    state = {
      isLoading: true,
      res: []
    }

    componentDidMount () {
      getDB().executeSql(SQLRequestFunction(this.props))
        .then(([results]) => {
          const len:number = results.rows.length
          const res = []
          for (let i = 0; i < len; i += 1) { res.push(results.rows.item(i)) }
          this.setState({ isLoading: false, res })
        })
    }
    render () {
      const { isLoading, res } = this.state
      return (
        <WrappedComponent isLoading={isLoading} result={res} {...this.props} />
      )
    }
  }
)

export default withSQLRequest
