import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import getDB from '../../helpers/database'
import * as BibleActions from '../../redux/modules/bible'
import {
  SelectorItem,
} from '../../components'


const styles = EStyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

@connect(
  state => ({
    selectedBook: state.bible.get('temp').get('selectedBook'),
    selectedChapter: state.bible.get('temp').get('selectedChapter'),
  }),
  BibleActions,
)
export default class ChapterSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setTempSelectedChapter: PropTypes.func.isRequired,
    selectedBook: PropTypes.number.isRequired,
    selectedChapter: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.onChapterChange = ::this.onChapterChange
  }

  state = {
    isLoaded: false
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadChapters()
  }

  componentDidUpdate(oldProps) {
    if (this.props.selectedBook !== oldProps.selectedBook) {
      this.loadChapters()
    }
  }

  onChapterChange(book) {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('sliding-tab-navigation').jumpToTab('verset')
    })
    this.props.setTempSelectedChapter(book)
  }

  loadChapters() {
    const { selectedBook } = this.props
    this.chapters = []
    this.setState({ isLoaded: false })
    this.DB.executeSql(`SELECT Chapitres FROM Livres WHERE Numero = ${selectedBook}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.chapters.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render() {
    const { isLoaded } = this.state
    const {
      selectedChapter,
    } = this.props

    if (!isLoaded) {
      return null
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {[...Array(this.chapters[0].Chapitres).keys()].map(c =>
          <SelectorItem
            key={c}
            item={c + 1}
            isSelected={selectedChapter === (c + 1)}
            onChange={this.onChapterChange}
          />
        )}
      </ScrollView>
    )
  }
}
