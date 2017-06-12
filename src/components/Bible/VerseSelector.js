import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import getDB from '@src/helpers/database'
import * as BibleActions from '@src/redux/modules/bible'
import { SelectorItem } from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
})

@connect(
  state => ({
    selectedBook: state.getIn(['bible', 'temp', 'selectedBook']).toJS(),
    selectedChapter: state.getIn(['bible', 'temp', 'selectedChapter']),
    selectedVerse: state.getIn(['bible', 'temp', 'selectedVerse'])
  }),
  BibleActions
)
@pure
export default class VerseSelector extends Component {
  props: {
    screenProps: Object,
    setTempSelectedVerse: Function,
    validateSelected: Function,
    selectedBook: Object,
    selectedChapter: number,
    selectedVerse: number
  }

  static navigationOptions = {
    tabBarLabel: 'Verset'
  }

  constructor (props) {
    super(props)

    this.onValidate = ::this.onValidate
  }

  state = {
    isLoaded: false
  }

  componentWillMount () {
    this.DB = getDB()
    this.loadVerses()
  }

  componentDidUpdate (oldProps) {
    if (
      (this.props.selectedChapter !== oldProps.selectedChapter) ||
      this.props.selectedBook.Numero !== oldProps.selectedBook.Numero) {
      this.loadVerses()
    }
  }

  onValidate (verse) {
    this.props.setTempSelectedVerse(verse)
    this.props.validateSelected()
    setTimeout(() => this.props.screenProps.mainNavigation.goBack(), 0)
  }

  loadVerses () {
    const { selectedBook, selectedChapter } = this.props
    const part = selectedBook.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.verses = []
    this.setState({ isLoaded: false })
    this.DB.executeSql(`SELECT count(*) as count FROM ${part} WHERE Livre = ${selectedBook.Numero} AND Chapitre = ${selectedChapter}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.verses.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render () {
    const { isLoaded } = this.state
    const {
      selectedVerse
    } = this.props

    if (!isLoaded) {
      return null
    }

    const array = Array(...Array(this.verses[0].count)).map((_, i) => i)

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {array.map(v =>
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
