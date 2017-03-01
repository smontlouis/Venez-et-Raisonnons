import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
} from 'react-native'
import {
  Header,
  BibleViewer,
} from '../components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

const Bible = ({ book, chapter }) =>
  <View style={styles.container}>
    <Header
      title="Bible"
      hasBackButton={false}
    />
    <BibleViewer
      book={book}
      chapter={chapter}
    />
  </View>

Bible.propTypes = {
  book: PropTypes.number.isRequired,
  chapter: PropTypes.number.isRequired,
}

export default connect(
  state => ({
    book: state.bible.get('book'),
    chapter: state.bible.get('chapter')
  })
)(Bible)
