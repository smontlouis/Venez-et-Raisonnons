import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import * as BibleActions from '../../redux/modules/bible'
import {
  BookSelectorItem,
  List,
} from '../../components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
})

@connect(
  state => ({
    selectedBook: state.bible.getIn(['temp', 'selectedBook']).toJS(),
    books: state.bible.get('books')
  }),
  BibleActions,
)
export default class BookSelector extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    setTempSelectedBook: PropTypes.func.isRequired,
    selectedBook: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.onBookChange = ::this.onBookChange
  }

  onBookChange(book) {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('sliding-tab-navigation').jumpToTab('chapitre')
    })
    this.props.setTempSelectedBook(book)
  }

  render() {
    const {
      books,
      selectedBook,
    } = this.props

    return (
      <List
        listItems={fromJS(books)}
        renderRow={book =>
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
