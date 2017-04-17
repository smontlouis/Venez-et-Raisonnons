import React, { PropTypes, Component } from 'react'
import {
  Animated,
  ScrollView,
  View,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import getDB from '@src/helpers/database'
import {
  BibleVerse,
  BibleFooter,
} from '@src/components'
import {
  loadBible,
} from '@src/helpers'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 40,
  },
})


export default class BibleViewer extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    chapter: PropTypes.number.isRequired,
    noArrows: PropTypes.bool,
    verse: PropTypes.number.isRequired,
    version: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.getPosition = ::this.getPosition
    this.scrollToVerse = ::this.scrollToVerse
  }

  state = {
    isLoading: false,
    scrollY: new Animated.Value(0),
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadVerses()
  }

  componentDidUpdate(oldProps) {
    if (
      (this.props.chapter !== oldProps.chapter)
      || (this.props.book.Numero !== oldProps.book.Numero)
      || (this.props.version !== oldProps.version)
    ) {
      setTimeout(() => this.loadVerses(), 0)
    }

    // Scroll ONLY when verse change ALONE
    if (
      (this.props.verse !== oldProps.verse)
      && (this.props.chapter === oldProps.chapter)
      && (this.props.book.Numero === oldProps.book.Numero)
    ) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  getPosition(numVerset, measures) {
    this.versesMeasure[`verse${numVerset}`] = measures
    // We need to wait 'til every Bible verse component get calculated
    if (Object.keys(this.versesMeasure).length === this.verses.length) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  scrollToVerse() {
    const { verse } = this.props
    const scrollHeight = (this.contentHeight - this.scrollViewHeight) + 20
    const y = (verse === 1) ? 0 : this.versesMeasure[`verse${verse}`].py - 75

    this.scrollView.scrollTo({
      x: 0,
      y: (y >= scrollHeight) ? scrollHeight : y,
      animated: false
    })
  }

  loadVerses() {
    const { book, chapter, version } = this.props

    this.verses = []
    this.versesMeasure = {}

    if (version === 'STRONG') {
      const part = book.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
      this.setState({ isLoading: true })
      this.DB.executeSql(`SELECT * FROM ${part} WHERE LIVRE = ${book.Numero} AND CHAPITRE  = ${chapter}`)
        .then(([results]) => {
          const len = results.rows.length
          for (let i = 0; i < len; i += 1) { this.verses.push(results.rows.item(i)) }
          this.setState({ isLoading: false })
        })
    } else {
      this.setState({ isLoading: true })
      loadBible(version)
      .then((res) => {
        const versesByChapter = res[book.Numero][chapter]
        this.verses = Object.keys(versesByChapter)
          .map(v => ({ Verset: v, Texte: versesByChapter[v] }))
        setTimeout(() => this.setState({ isLoading: false }), 150)
      })
    }
  }

  render() {
    const { isLoading } = this.state
    const { book, chapter, version, noArrows } = this.props

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(r) => { this.scrollView = r }}
          onContentSizeChange={(w, h) => { this.contentHeight = h }}
          onLayout={(ev) => { this.scrollViewHeight = ev.nativeEvent.layout.height }}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollView}
        >
          {
            this.verses.map((verse, i) =>
              <BibleVerse
                version={version}
                verse={verse}
                key={i}
                getPosition={this.getPosition}
              />
            )
          }
        </ScrollView>
        {
          !noArrows &&
          <BibleFooter
            disabled={isLoading}
            book={book}
            chapter={chapter}
            scrollY={this.state.scrollY}
          />
        }
      </View>
    )
  }
}
