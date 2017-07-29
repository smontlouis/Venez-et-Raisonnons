// @flow
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { pure, compose } from 'recompose'
import * as BibleActions from '../../redux/modules/bible'
import books from '../../helpers/livres'
import { BookSelectorItem } from '../../components'

import type { Book } from '../../types'
import type {
  NavigationAction,
  NavigationState,
  NavigationScreenProp
} from 'react-navigation/src/TypeDefinition'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20
  }
})

type RenderedItem = {
  item: Book
}

class BookSelector extends Component {
  props: {
    navigation: NavigationScreenProp<NavigationState, NavigationAction>,
    setTempSelectedBook: (book: Book) => void,
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
      <FlatList
        data={Object.values(books)}
        keyExtractor={(item: Book, index: number) => `${index}`}
        renderItem={({ item: book }: RenderedItem) => (
          <BookSelectorItem
            onChange={this.onBookChange}
            book={book}
            isSelected={book.Numero === selectedBook.Numero}
          />
        )}
        style={styles.container}
      />
    )
  }
}

export default compose(
  pure,
  connect(
    state => ({
      selectedBook: state.getIn(['bible', 'temp', 'selectedBook']).toJS()
    }),
    { ...BibleActions }
  )
)(BookSelector)
