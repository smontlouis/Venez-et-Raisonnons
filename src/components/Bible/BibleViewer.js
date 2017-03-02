import React, { PropTypes, Component } from 'react'
import {
  ScrollView,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import getDB from '../../helpers/database'
import {
  BibleVerse
} from '../../components'

const styles = EStyleSheet.create({
  container: {
    padding: 20,
  },
})


export default class BibleViewer extends Component {
  static propTypes = {
    book: PropTypes.number.isRequired,
    chapter: PropTypes.number.isRequired,
    verse: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.getPosition = ::this.getPosition
    this.scrollToVerse = ::this.scrollToVerse
  }

  state = {
    isLoaded: false
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadVerses()
  }

  componentDidUpdate(oldProps) {
    if ((this.props.chapter !== oldProps.chapter) || (this.props.book !== oldProps.book)) {
      setTimeout(() => this.loadVerses(), 0)
    }

    // Scroll ONLY when verse change ALONE
    if (
      (this.props.verse !== oldProps.verse)
      && (this.props.chapter === oldProps.chapter)
      && (this.props.book === oldProps.book)
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
    const y = (verse === 1) ? 0 : this.versesMeasure[`verse${verse}`].y + 17
    this.scrollView.scrollTo({
      x: 0,
      y: (y >= scrollHeight) ? scrollHeight : y,
      animated: true
    })
  }

  loadVerses() {
    const { book, chapter } = this.props
    const part = book > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.verses = []
    this.versesMeasure = {}
    this.setState({ isLoaded: false })
    this.DB.executeSql(`SELECT * FROM ${part} WHERE LIVRE = ${book} AND CHAPITRE  = ${chapter}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.verses.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render() {
    const { isLoaded } = this.state
    if (!isLoaded) {
      return null
    }
    return (
      <ScrollView
        ref={(r) => { this.scrollView = r }}
        onContentSizeChange={(w, h) => { this.contentHeight = h }}
        onLayout={(ev) => { this.scrollViewHeight = ev.nativeEvent.layout.height }}
        style={styles.container}
      >
        <Text>
          {
            this.verses.map((verse, i) =>
              <BibleVerse
                verse={verse}
                key={i}
                getPosition={this.getPosition}
              />
            )
          }
        </Text>
      </ScrollView>
    )
  }
}
