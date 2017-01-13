import React, { Component, PropTypes } from 'react'
import Toast from 'react-native-simple-toast'
import {
  ListView,
  RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
import * as AppActions from '../redux/modules/app'


class List extends Component {
  static propTypes = {
    listItems: PropTypes.object.isRequired,
    loadData: PropTypes.func.isRequired,
    style: PropTypes.any,
  }

  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (oldRow, newRow) => oldRow !== newRow,
    })

    const data = props.listItems

    this.onRefresh = ::this.onRefresh
    this.state = {
      dataSource: dataSource.cloneWithRows(data.toJS()),
      refreshing: false,
    }
  }

  componentWillReceiveProps({ listItems: nextListItems }) {
    const { listItems } = this.props
    const { dataSource } = this.state

    if (nextListItems !== listItems) {
      this.setState({
        dataSource: dataSource.cloneWithRows(nextListItems.toJS())
      })
    }
  }

  onRefresh() {
    const { loadData } = this.props
    this.setState({ refreshing: true })
    loadData().then(() => {
      this.setState({ refreshing: false })
      Toast.show('Application à jour')
    })
  }

  render() {
    const { style, ...props } = this.props
    return (
      <ListView
        dataSource={this.state.dataSource}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        style={style}
        {...props}
      />
    )
  }
}

export default connect(
  null,
  AppActions
)(List)
