/* global fetch */
import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import {
  ScrollableHeader,
  // Share,
  LinkToStudy,
  MarkAsRead,
  AddToFavorites,
  LikeCount,
  VerseModal,
  StylizedHTMLView,
  PrevNext,
} from '../../components'
import {
  loadDarby,
  range,
} from '../../helpers'
import styles, { setDynamicFontSize } from './styles'

export default class Question extends Component {
  static propTypes = {
    fromStudy: PropTypes.bool,
    question: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onLinkPress = ::this.onLinkPress
  }

  state = {
    verseIsLoading: false,
    verse: {
      title: '',
      text: '',
    }
  }

  onLinkPress(url, title) {
    this.modal.open()
    this.setState({ verseIsLoading: true })
    loadDarby()
      .then((res) => {
        const { book, chapter, verses } = this.parseUrl(url)
        const bookIndex = Object.keys(res.books).find(key => (
          res.books[key][0] === book
                  || res.books[key][1] === book
                  || res.books[key][2] === book
        ))
        const text = verses.map(v => ({
          verse: v,
          text: res.content[bookIndex][chapter][v]
        }))

        this.setState({
          verseIsLoading: false,
          verse: {
            title,
            text
          },
        })
      })
      .catch(() => {
        this.setState({
          verseIsLoading: false,
          verse: {
            title: 'Erreur',
            text: 'Une erreur est survenue. Veuillez contacter l\'administrateur',
          },
        })
      })
  }

  /*
  * @example - genese.1.4 - genese.1.4-8 - genese.1.4,8
   */
  parseUrl(url) {
    const [book, chapter, verses] = url.split('.')
    let versesArray

    if (verses.includes('-')) {
      const [vStart, vEnd] = verses.split('-')
      versesArray = range(Number(vStart), Number(vEnd) + 1)
    } else if (verses.includes(',')) {
      const [vStart, vEnd] = verses.split(',')
      versesArray = [vStart, vEnd]
    } else {
      versesArray = [Number(verses)]
    }

    return {
      book,
      chapter,
      verses: versesArray
    }
  }

  render() {
    const {
      question,
      topic,
      markAsRead,
      fromStudy,
    } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={question.get('title')}
          onScrollViewEnd={() => markAsRead(question.get('id'))}
          header={(
            <View style={styles.header}>
              <Text style={styles.topic}>{ topic.get('title') }</Text>
              <Text style={[styles.title, setDynamicFontSize(question.get('title'))]}>{ question.get('title') }</Text>
            </View>
          )}
          rightComponent={(
            <AddToFavorites
              id={question.get('id')}
              hasIconOnly
            />
          )}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.responseContainer}>
              <Text style={styles.subTitle}>Réponse</Text>
              <StylizedHTMLView
                value={question.get('description')}
                onLinkPress={this.onLinkPress}
              />
            </View>
            {
              (!!question.get('parent') && !fromStudy) &&
              <LinkToStudy id={question.get('parent')} />
            }
            <View style={styles.shareWrapper}>
              {/* <Share id={question.get('id')} /> */}
              <MarkAsRead id={question.get('id')} />
              <AddToFavorites id={question.get('id')} />
            </View>
            <LikeCount count={question.get('likeCount')} id={question.get('id')} />
            {
              !!question.get('parent') &&
              <PrevNext
                parentId={question.get('parent')}
                questionId={question.get('id')}
              />
            }
          </ScrollView>
        </ScrollableHeader>
        <VerseModal
          refValue={(c) => { this.modal = c }}
          isLoading={this.state.verseIsLoading}
          title={this.state.verse.title}
          text={this.state.verse.text}
        />
      </View>
    )
  }
}
