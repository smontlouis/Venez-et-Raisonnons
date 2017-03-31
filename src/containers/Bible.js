import React from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
} from 'react-native'
import {
  BibleHeader,
  BibleViewer,
} from '@src/components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

type BibleProps = {
  book: object,
  chapter: number,
  verse: number,
  version: string,
}

const Bible = ({ book, chapter, verse, version }: BibleProps) =>
  <View style={styles.container}>
    <BibleHeader
      book={book}
      chapter={chapter}
      version={version}
    />
    <BibleViewer
      book={book}
      chapter={chapter}
      verse={verse}
      version={version}
    />
  </View>

export default connect(
  state => ({
    book: state.getIn(['bible', 'selectedBook']).toJS(),
    chapter: state.getIn(['bible', 'selectedChapter']),
    verse: state.getIn(['bible', 'selectedVerse']),
    version: state.getIn(['bible', 'selectedVersion']),
  })
)(Bible)
