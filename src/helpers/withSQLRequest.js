// @flow

import React, { Component } from 'react'
import getDB from '@src/helpers/database'

import { type Verse } from '../types'
type ClassComponent<P, S> = Class<React$Component<void, P, S>>
type State = {
  isLoading: boolean,
  verses:Array<Verse>
}

const withSQLRequest = <P: Object>(SQLRequest: string) => (WrappedComponent: ClassComponent<P, State>): ClassComponent<P, State> => (
  class SQLComponent extends Component {
    state = {
      isLoading: true,
      verses: []
    }

    componentDidMount () {
      getDB().executeSql(SQLRequest)
        .then(([results]) => {
          const len:number = results.rows.length
          const verses = []
          for (let i = 0; i < len; i += 1) { verses.push(results.rows.item(i)) }
          this.setState({ isLoading: false, verses })
        })
    }
    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
)

export default withSQLRequest
