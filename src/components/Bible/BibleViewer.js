import React, { PropTypes, Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import getDB from '@src/helpers/database'
import { BibleVerse, BibleFooter, Loading } from '@src/components'
import { loadBible } from '@src/helpers'
import * as BibleActions from '@src/redux/modules/bible'

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 40
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 20,
    backgroundColor: 'white',
    borderColor: '$color.primary',
    borderRadius: 5,
    borderWidth: 2
  },
  buttonText: {
    color: '$color.primary'
  }
})

@connect(
  null,
  BibleActions
)
@pure
export default class BibleViewer extends Component {
  static propTypes = {
    arrayVerses: PropTypes.object,
    book: PropTypes.object.isRequired,
    chapter: PropTypes.number.isRequired,
    goToPrevChapter: PropTypes.func.isRequired,
    goToNextChapter: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    verse: PropTypes.number.isRequired,
    version: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.getPosition = ::this.getPosition
    this.scrollToVerse = ::this.scrollToVerse
    this.renderVerses = ::this.renderVerses
  }

  state = {
    isLoading: true,
    verses: []
  }

  componentWillMount () {
    this.DB = getDB()
    setTimeout(() => this.loadVerses(), 500)
  }

  componentWillReceiveProps (oldProps) {
    if (
      (this.props.chapter !== oldProps.chapter) ||
      (this.props.book.Numero !== oldProps.book.Numero) ||
      (this.props.version !== oldProps.version)
    ) {
      setTimeout(() => this.loadVerses(), 0)
    }

    // Scroll ONLY when verse change ALONE
    if (
      (this.props.verse !== oldProps.verse) &&
      (this.props.chapter === oldProps.chapter) &&
      (this.props.book.Numero === oldProps.book.Numero)
    ) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  getPosition (numVerset, measures) {
    this.versesMeasure[`verse${numVerset}`] = measures
    // We need to wait 'til every Bible verse component get calculated
    if (Object.keys(this.versesMeasure).length === this.state.verses.length) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  scrollToVerse () {
    const { verse } = this.props
    if (this.versesMeasure[`verse${verse}`] && this.scrollView) {
      const scrollHeight = (this.contentHeight - this.scrollViewHeight) + 20
      const y = (verse === 1) ? 0 : this.versesMeasure[`verse${verse}`].py - 75

      this.scrollView.scrollTo({
        x: 0,
        y: (y >= scrollHeight) ? scrollHeight : y,
        animated: false
      })
    }
  }

  loadVerses () {
    const { book, chapter, version } = this.props
    let tempVerses
    this.versesMeasure = {}

    if (version === 'STRONG') {
      const part = book.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
      this.setState({ isLoading: true })
      this.DB.executeSql(`SELECT * FROM ${part} WHERE LIVRE = ${book.Numero} AND CHAPITRE  = ${chapter}`)
        .then(([results]) => {
          const len = results.rows.length
          tempVerses = []
          for (let i = 0; i < len; i += 1) { tempVerses.push(results.rows.item(i)) }
          this.setState({ isLoading: false, verses: tempVerses })
        })
    } else {
      this.setState({ isLoading: true })
      loadBible(version)
      .then((res) => {
        const versesByChapter = res[book.Numero][chapter]
        tempVerses = []
        tempVerses = Object.keys(versesByChapter)
          .map(v => ({ Verset: v, Texte: versesByChapter[v] }))
        this.setState({ isLoading: false, verses: tempVerses })
      })
    }
  }

  renderVerses () {
    const { version, arrayVerses, book, chapter } = this.props
    let array = this.state.verses

    if (arrayVerses && book.Numero === arrayVerses.book.Numero && chapter === arrayVerses.chapter) {
      array = array.filter(v => arrayVerses.verses.find(aV => aV === Number(v.Verset)))
    }

    return array.map(verse =>
      <BibleVerse
        version={version}
        verse={verse}
        key={`${verse.Verset}${verse.Livre}${verse.Chapitre}`}
        getPosition={this.getPosition}
      />
    )
  }

  render () {
    const { isLoading } = this.state
    const { book, chapter, arrayVerses, navigation, goToPrevChapter, goToNextChapter } = this.props

    if (isLoading) {
      return (<Loading />)
    }

    return (
      <View
        style={styles.container}
      >
        <ScrollView
          ref={(r) => { this.scrollView = r }}
          onContentSizeChange={(w, h) => { this.contentHeight = h }}
          onLayout={(ev) => { this.scrollViewHeight = ev.nativeEvent.layout.height }}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollView}
        >
          {this.renderVerses()}
          {
            !!arrayVerses &&
            <Button
              title='Lire le chapitre entier'
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => navigation.navigate('bible', { hasBack: true, verse: arrayVerses.verses[0] })}
            />
          }
        </ScrollView>
        {
          !arrayVerses &&
          <BibleFooter
            disabled={isLoading}
            book={book}
            chapter={chapter}
            goToPrevChapter={goToPrevChapter}
            goToNextChapter={goToNextChapter}
          />
        }
      </View>
    )
  }
}
