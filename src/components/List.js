import React, { Component } from 'react'
import R from 'ramda'
import { ListView } from 'react-native'
import { pure } from 'recompose'

class List extends Component {
  props: {
    listItems: Object,
    contentContainerStyle?: any
  }

  constructor (props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (oldRow, newRow) => oldRow !== newRow
    })

    const data = props.listItems

    this.state = {
      dataSource: dataSource.cloneWithRows(R.values(data.toJS()))
    }
  }

  componentWillReceiveProps ({ listItems: nextListItems }) {
    const { listItems } = this.props
    const { dataSource } = this.state

    if (nextListItems !== listItems) {
      this.setState({
        dataSource: dataSource.cloneWithRows(R.values(nextListItems.toJS()))
      })
    }
  }

  render () {
    const { contentContainerStyle, ...props } = this.props
    return (
      <ListView
        dataSource={this.state.dataSource}
        contentContainerStyle={contentContainerStyle}
        {...props}
      />
    )
  }
}

export default pure(List)
