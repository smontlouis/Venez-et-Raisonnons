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
      this.loadVerses()
    }
  }

  loadVerses() {
    const { book, chapter } = this.props
    const part = book > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.verses = []
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
      <ScrollView style={styles.container}>
        <Text>
          {
            this.verses.map((verse, i) =>
              <BibleVerse
                verse={verse}
                key={i}
              />
            )
          }
        </Text>
      </ScrollView>
    )
  }
}
