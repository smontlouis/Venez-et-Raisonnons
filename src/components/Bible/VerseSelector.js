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
    selectedVerse: state.bible.get('temp').get('selectedVerse'),
  }),
  BibleActions,
)
export default class VerseSelector extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    setTempSelectedVerse: PropTypes.func.isRequired,
    validateSelected: PropTypes.func.isRequired,
    selectedBook: PropTypes.number.isRequired,
    selectedChapter: PropTypes.number.isRequired,
    selectedVerse: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.onValidate = ::this.onValidate
  }

  state = {
    isLoaded: false
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadVerses()
  }

  componentDidUpdate(oldProps) {
    if (this.props.selectedChapter !== oldProps.selectedChapter) {
      this.loadVerses()
    }
  }

  onValidate(verse) {
    this.props.setTempSelectedVerse(verse)
    this.props.validateSelected(verse)
    this.props.navigator.pop()
  }

  loadVerses() {
    const { selectedBook, selectedChapter } = this.props
    const part = selectedBook > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.setState({ isLoaded: false })
    this.verses = []
    this.DB.executeSql(`SELECT count(*) as count FROM ${part} WHERE Livre = ${selectedBook} AND Chapitre = ${selectedChapter}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.verses.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render() {
    const { isLoaded } = this.state
    const {
      selectedVerse,
    } = this.props

    if (!isLoaded) {
      return null
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {[...Array(this.verses[0].count).keys()].map(v =>
          <SelectorItem
            key={v}
            item={v + 1}
            isSelected={selectedVerse === (v + 1)}
            onChange={this.onValidate}
          />
        )}
      </ScrollView>
    )
  }
}
