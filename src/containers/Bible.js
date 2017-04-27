import React, { Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View, StatusBar } from 'react-native'
import * as BibleActions from '@src/redux/modules/bible'
import { BibleHeader, BibleViewer } from '@src/components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

type BibleProps = {
  arrayVerses?: object,
  navigation: object,
  hasBack: bool,
  app: {
    book: object,
    chapter: number,
    verse: number,
    version: string,
  },
  book: object,
  chapter: number,
  verse: number,
  version: string,
  setAllAndValidateSelected: func,
}

@connect(
  (state, ownProps) => ({
    hasBack: ownProps.hasBack || !!ownProps.book,
    app: {
      book: state.getIn(['bible', 'selectedBook']).toJS(),
      chapter: state.getIn(['bible', 'selectedChapter']),
      verse: state.getIn(['bible', 'selectedVerse']),
      version: state.getIn(['bible', 'selectedVersion']),
      isLoading: state.getIn(['bible', 'isLoading']),
    },
  }),
  BibleActions
)
export default class Bible extends Component {

  state = {
    isLoading: true
  }

  componentDidMount() {
    const { book, chapter, verse, version } = this.props
    if (book || chapter || verse) {
      this.props.setAllAndValidateSelected({ book, chapter, verse, version })
      .then(() => this.setState({ isLoading: false }))
    } else {
      this.setState({ isLoading: false })
    }
  }

  props: BibleProps

  render() {
    const { isLoading } = this.state
    const { arrayVerses, app, hasBack, navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BibleHeader
          hasBack={hasBack}
          book={app.book}
          chapter={app.chapter}
          version={app.version}
        />
        {
          !isLoading &&
          <BibleViewer
            arrayVerses={arrayVerses}
            book={app.book}
            chapter={app.chapter}
            verse={app.verse}
            version={app.version}
            navigation={navigation}
          />
        }
      </View>
    )
  }
}

