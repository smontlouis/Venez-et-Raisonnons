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
} from '../../components'
import styles, { setDynamicFontSize } from './styles'
import * as AppActions from '../../redux/modules/app'


const getCurrentChildrenIds = (state, props) => props.question.get('children')
const getMarkedAsReadQuestionsIds = state => state.app.get('hasBeenRead')

const checkIfAllMarkedQuestions = createSelector(
  [getCurrentChildrenIds, getMarkedAsReadQuestionsIds],
  (childrenIds, markedAsReadIds) => childrenIds.every(cID => markedAsReadIds.get(cID))
)

@connect(
  (state, ownProps) => ({
    checkIfAllRead: checkIfAllMarkedQuestions(state, ownProps),
    markedAsRead: !!state.app.getIn(['hasBeenRead', ownProps.question.get('id')])
  }),
  AppActions,
)
export default class Question extends Component {
  static propTypes = {
    children: PropTypes.object,
    checkIfAllRead: PropTypes.bool.isRequired,
    markedAsRead: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired,
    removeAsRead: PropTypes.func.isRequired,
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

  componentDidMount() {
    this.markOrRemoveReadByCheckingChildren()
  }

  componentWillReceiveProps() {
    this.markOrRemoveReadByCheckingChildren()
  }

  onLinkPress(url, title) {
    this.modal.open()
    this.setState({ verseIsLoading: true })
    fetch(`https://www.bible.com/fr/bible/93/${url}.json`)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          verseIsLoading: false,
          verse: {
            title,
            text: json.reader_html
          },
        })
      })
  }

  markOrRemoveReadByCheckingChildren() {
    const { markedAsRead, markAsRead, removeAsRead, checkIfAllRead, question } = this.props
    if (checkIfAllRead !== markedAsRead) {
      if (checkIfAllRead) {
        markAsRead(question.get('id'))
      } else {
        removeAsRead(question.get('id'))
      }
    }
  }

  render() {
    const {
      question,
      topic,
      children,
      markedAsRead,
    } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={question.get('title')}
          headerStyle={{ backgroundColor: '#1A806F' }}
          header={(
            <View style={styles.header}>
              <Text style={styles.topic}>{ topic.get('title') } | Étude biblique</Text>
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
