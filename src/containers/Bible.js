import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
} from 'react-native'
import {
  BibleHeader,
  BibleViewer,
} from '../components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

const Bible = ({ book, chapter, verse }) =>
  <View style={styles.container}>
    <BibleHeader
      book={book}
      chapter={chapter}
    />
    <BibleViewer
      book={book}
      chapter={chapter}
      verse={verse}
    />
  </View>

Bible.propTypes = {
  book: PropTypes.number.isRequired,
  chapter: PropTypes.number.isRequired,
  verse: PropTypes.number.isRequired,
}

export default connect(
  state => ({
    book: state.bible.get('selectedBook'),
    chapter: state.bible.get('selectedChapter'),
    verse: state.bible.get('selectedVerse'),
  })
)(Bible)
