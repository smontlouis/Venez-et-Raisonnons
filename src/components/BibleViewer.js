import React, { PropTypes, Component } from 'react'
import {
  Text,
  ScrollView,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import getDB from '../helpers/database'

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
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
    this.verses = []
    this.loadVerses()
  }

  loadVerses() {
    const { book, chapter } = this.props
    const part = book > 39 ? 'LSGSNT2' : 'LSGSAT2'
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
        {
          this.verses.map((v, i) =>
            <Text key={i}>{v.Texte}</Text>
          )
        }
      </ScrollView>
    )
  }
}
