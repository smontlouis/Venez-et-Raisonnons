import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import getDB from '../../helpers/database'
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
    selectedBook: state.bible.get('temp').get('selectedBook'),
  }),
  BibleActions,
)
export default class BookSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setTempSelectedBook: PropTypes.func.isRequired,
    selectedBook: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.onBookChange = ::this.onBookChange
  }

  state = {
    isLoaded: false
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadBooks()
  }

  onBookChange(book) {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('sliding-tab-navigation').jumpToTab('chapitre')
    })
    this.props.setTempSelectedBook(book)
  }

  loadBooks() {
    this.books = []
    this.setState({ isLoaded: false })
    this.DB.executeSql('SELECT * FROM Livres')
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.books.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render() {
    const { isLoaded } = this.state
    const {
      selectedBook,
    } = this.props

    if (!isLoaded) {
      return null
    }
    return (
      <List
        listItems={fromJS(this.books)}
        renderRow={book =>
          <BookSelectorItem
            onChange={this.onBookChange}
            book={book}
            isSelected={book.Numero === selectedBook}
          />
        }
        style={styles.container}
      />
    )
  }
}
