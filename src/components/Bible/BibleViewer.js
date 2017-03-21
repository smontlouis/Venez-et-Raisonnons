import React, { PropTypes, Component } from 'react'
import {
  Animated,
  ScrollView,
  View,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import getDB from '../../helpers/database'
import {
  BibleVerse,
  BibleFooter,
} from '../../components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
    paddingLeft: 0,
  },
})


export default class BibleViewer extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    chapter: PropTypes.number.isRequired,
    verse: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.getPosition = ::this.getPosition
    this.scrollToVerse = ::this.scrollToVerse
    this.onScrollMoveFooter = ::this.onScrollMoveFooter
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

  onScrollMoveFooter(event) {
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = currentOffset > this.offset ? 'down' : 'up'
    const distance = this.offset ? (this.offset - currentOffset) : 0
    const newPosition = this.state.scrollY._value - distance
    if (currentOffset > 0 && currentOffset < (this.contentHeight - this.scrollViewHeight)) {
      if (direction === 'down') {
        if (this.state.scrollY._value < 60) {
          this.state.scrollY.setValue(newPosition > 60 ? 60 : newPosition)
        }
      }
      if (direction === 'up') {
        if (this.state.scrollY._value >= 0) {
          this.state.scrollY.setValue(newPosition < 0 ? 0 : newPosition)
        }
      }
      this.offset = currentOffset
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
      animated: true
    })
  }

  loadVerses() {
    const { book, chapter } = this.props
    const part = book.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.verses = []
    this.versesMeasure = {}
    this.setState({ isLoading: true })
    this.DB.executeSql(`SELECT * FROM ${part} WHERE LIVRE = ${book.Numero} AND CHAPITRE  = ${chapter}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.verses.push(results.rows.item(i)) }
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { isLoading } = this.state
    const { book, chapter } = this.props

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(r) => { this.scrollView = r }}
          onContentSizeChange={(w, h) => { this.contentHeight = h }}
          onLayout={(ev) => { this.scrollViewHeight = ev.nativeEvent.layout.height }}
          onScroll={this.onScrollMoveFooter}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollView}
        >
          {
            this.verses.map((verse, i) =>
              <BibleVerse
                verse={verse}
                key={i}
                getPosition={this.getPosition}
              />
            )
          }
        </ScrollView>
        <BibleFooter
          disabled={isLoading}
          book={book}
          chapter={chapter}
          scrollY={this.state.scrollY}
        />
      </View>
    )
  }
}
