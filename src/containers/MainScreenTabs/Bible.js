import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import * as BibleActions from '@src/redux/modules/bible'
import { BibleHeader, BibleViewer, LoginModal } from '@components'
import { Container } from '@ui'

type BibleProps = {
  navigation: Object,
  hasBack: ?bool,
  app: ?{
    book: Object,
    chapter: number,
    verse: number,
    version: string,
  },
  setAllAndValidateSelected?: Function,
}

@connect(
  (state, ownProps) => ({
    hasBack: !!ownProps.navigation.state.params,
    app: {
      book: state.getIn(['bible', 'selectedBook']).toJS(),
      chapter: state.getIn(['bible', 'selectedChapter']),
      verse: state.getIn(['bible', 'selectedVerse']),
      version: state.getIn(['bible', 'selectedVersion'])
    }
  }),
  BibleActions
)
export default class Bible extends Component {
  state = {
    isLoading: true
  }

  componentDidMount () {
    const { book, chapter, verse, version } = this.props.navigation.state.params || {}
    if (book || chapter || verse) {
      this.props.setAllAndValidateSelected({ book, chapter, verse, version })
      .then(() => this.setState({ isLoading: false }))
    } else {
      this.setState({ isLoading: false })
    }
  }

  props: BibleProps

  render () {
    const { isLoading } = this.state
    const { app, navigation, hasBack } = this.props
    const { arrayVerses } = this.props.navigation.state.params || {}
    return (
      <Container>
        <StatusBar barStyle='light-content' />
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
        <LoginModal />
      </Container>
    )
  }
}
