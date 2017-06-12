import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { pure } from 'recompose'
import { List } from '@src/components'

@pure
export default class PaginateList extends Component {

  static propTypes = {
    currentPage: PropTypes.number,
    list: PropTypes.object.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
  }

  static defaultProps = {
    currentPage: 1
  }

  constructor(props) {
    super(props)

    const { list, itemsPerPage } = this.props

    this.itemsPerPage = itemsPerPage
    this.list = list
    this.numberOfPages = Math.ceil(this.list.count() / this.itemsPerPage)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.list = nextProps.list
      this.numberOfPages = Math.ceil(this.list.count() / this.itemsPerPage)
    }
  }


  render() {
    const startAt = ((this.props.currentPage - 1) * this.itemsPerPage)
    const endAt = startAt + this.itemsPerPage

    return (
      <View>
        <List
          listItems={this.list.slice(startAt, endAt)}
          contentContainerStyle={(this.numberOfPages > 1) && { paddingBottom: 30 }}
          {...this.props}
        />
      </View>
    )
  }
}
