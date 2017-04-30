import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  NoItems,
  Loading,
} from '@src/components'
import { loadData } from '@src/redux/modules/app'

@connect(
  state => ({
    topics: state.getIn(['topics', 'topics']),
    isLoading: state.getIn(['app', 'isLoading']),
  })
)
class Master extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    topics: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(loadData())
  }

  render() {
    const { topics, isLoading, dispatch, children } = this.props

    if (topics.isEmpty() && !isLoading) {
      return (
        <NoItems
          icon="sentiment-dissatisfied"
          text="Pas de connexion"
          buttonTitle="Réessayer"
          buttonAction={() => dispatch(loadData())}
        />
      )
    }

    if (topics.isEmpty()) {
      return (
        <Loading />
      )
    }

    return children
  }
}

export default Master
