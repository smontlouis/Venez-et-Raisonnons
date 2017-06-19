// @flow
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { pure, compose } from 'recompose'
import * as BibleActions from '../../redux/modules/bible'
import books from '../../helpers/livres'
import { BookSelectorItem, List } from '../../components'

import { type Book } from '../../types'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20
  }
})

class BookSelector extends Component {
  props: {
    navigation: Object,
    setTempSelectedBook: Function,
    selectedBook: Book
  }

  static navigationOptions = {
    tabBarLabel: 'Livres'
  }

  onBookChange = (book: Book) => {
    this.props.navigation.navigate('chapitre')
    this.props.setTempSelectedBook(book)
  }

  render () {
    const {
      selectedBook
    } = this.props

    return (
      <List
        listItems={fromJS(books)}
        renderRow={(book: Book) =>
          <BookSelectorItem
            onChange={this.onBookChange}
            book={book}
            isSelected={book.Numero === selectedBook.Numero}
          />
        }
        style={styles.container}
      />
    )
  }
}

export default compose(
  connect(
    state => ({
      selectedBook: state.getIn(['bible', 'temp', 'selectedBook']).toJS()
    }),
    BibleActions
  ),
 pure
)(BookSelector)
