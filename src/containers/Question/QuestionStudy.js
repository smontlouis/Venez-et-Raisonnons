/* global fetch */
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import {
  ScrollableHeader,
  // Share,
  QuestionsList,
  CheckIfAllRead,
  AddToFavorites,
  LikeCount,
  VerseModal,
  StylizedHTMLView
} from '@src/components'
import { range } from '@src/helpers'
import * as AppActions from '@src/redux/modules/app'
import { Title } from '@src/styled'
import styles, { setDynamicFontSize } from './styles'
import Livres from '../../helpers/livres'

const Books = require('../../helpers/books.json')

const getCurrentChildrenIds = (state, props) => props.question.get('children')
const getMarkedAsReadQuestionsIds = state => state.get('app').get('hasBeenRead')

const checkIfAllMarkedQuestions = createSelector(
  [getCurrentChildrenIds, getMarkedAsReadQuestionsIds],
  (childrenIds, markedAsReadIds) => childrenIds.every(cID => markedAsReadIds.get(cID))
)

@connect(
  (state, ownProps) => ({
    checkIfAllRead: checkIfAllMarkedQuestions(state, ownProps),
    markedAsRead: !!state.getIn(['app', 'hasBeenRead', ownProps.question.get('id')])
  }),
  AppActions
)
export default class QuestionStudy extends Component {
  static propTypes = {
    children: PropTypes.object,
    checkIfAllRead: PropTypes.bool.isRequired,
    markedAsRead: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired,
    removeAsRead: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.onLinkPress = ::this.onLinkPress
  }

  state = {
    verseIsLoading: false,
    verse: {
      title: '',
      text: ''
    }
  }

  componentDidMount () {
    this.markOrRemoveReadByCheckingChildren()
  }

  componentWillReceiveProps () {
    this.markOrRemoveReadByCheckingChildren()
  }

  onLinkPress (url) {
    const { navigation } = this.props
    const { book, chapter, verses } = this.parseUrl(url)
    const bookIndex = Object.keys(Books).find(key => (
      Books[key][0] === book ||
      Books[key][1] === book ||
      Books[key][2] === book
    ))

    const bookObject = Livres[bookIndex - 1]

    const params = {
      book: bookObject,
      chapter: Number(chapter)
    }

    if (verses) {
      params.arrayVerses = {
        book: bookObject,
        chapter: Number(chapter),
        verses
      }
    }

    navigation.navigate('bible', params)
  }

  /*
  * @example - genese.1.4 - genese.1.4-8 - genese.1.4,8
   */
  parseUrl (url) {
    const [book, chapter, verses] = url.split('.')
    let versesArray

    if (verses && verses.includes('-')) {
      const [vStart, vEnd] = verses.split('-')
      versesArray = range(Number(vStart), Number(vEnd) + 1)
    } else if (verses && verses.includes(',')) {
      const splittedVersesByComma = verses.split(',')
      versesArray = splittedVersesByComma.map(v => Number(v))
    } else {
      versesArray = verses ? [Number(verses)] : null
    }

    return {
      book,
      chapter,
      verses: versesArray
    }
  }

  markOrRemoveReadByCheckingChildren () {
    const { markedAsRead, markAsRead, removeAsRead, checkIfAllRead, question } = this.props
    if (checkIfAllRead !== markedAsRead) {
      if (checkIfAllRead) {
        markAsRead(question.get('id'))
      } else {
        removeAsRead(question.get('id'))
      }
    }
  }

  render () {
    const {
      question,
      topic,
      children,
      markedAsRead
    } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={question.get('title')}
          headerStyle={{ backgroundColor: '#1A806F' }}
          header={(
            <View style={styles.header}>
              <Text style={styles.topic}>{ topic.get('title') } | Étude biblique</Text>
              <Title reverse secondaryFont style={setDynamicFontSize(question.get('title'))}>{ question.get('title') }</Title>
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
              <Text style={styles.subTitle}>Introduction</Text>
              <StylizedHTMLView
                value={question.get('description')}
                onLinkPress={this.onLinkPress}
              />
            </View>
            <QuestionsList
              questions={children}
              withCounting
            />
            <View style={styles.shareWrapper}>
              {/* <Share id={question.get('id')} /> */}
              <CheckIfAllRead markedAsRead={markedAsRead} />
              <AddToFavorites id={question.get('id')} />
            </View>
            <LikeCount count={question.get('likeCount')} id={question.get('id')} />
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
