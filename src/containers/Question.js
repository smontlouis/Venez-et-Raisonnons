/* global fetch */

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import {
  ScrollableHeader,
  Share,
  AddToFavorites,
  LikeCount,
  VerseModal,
} from '../components'
import HTMLView from '../helpers/react-native-htmlview'
import * as QuestionsActions from '../redux/modules/questions'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  responseContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },
  header: {
    padding: 35,
  },
  title: {
    fontFamily: '$font.title',
    color: 'white',
    fontSize: 27,
    lineHeight: 38,
    width: '80%',
    marginTop: 5,
  },
  subTitle: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: '$color.tertiary',
    marginBottom: 15,
  },
  topic: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  shareWrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '$color.grey',
    marginTop: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },

  // HTML View
  p: {
    lineHeight: 22,
    fontSize: 16,
  },
  a: {
    fontWeight: 'bold',
    color: '$color.primary',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
  },
})

const getCurrentQuestion = (state, props) => state.questions.get('questions').get(props.questionId)
const getTopics = state => state.topics.get('topics')

const getCurrentTopic = createSelector(
  [getCurrentQuestion, getTopics],
  (question, topics) => topics.get(question.get('topic'))
)

@connect(
  (state, ownProps) => ({
    question: getCurrentQuestion(state, ownProps),
    topic: getCurrentTopic(state, ownProps)
  }),
  QuestionsActions,
)
export default class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
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

  render() {
    const {
      question,
      topic
    } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={question.get('title')}
          header={(
            <View style={styles.header}>
              <Text style={styles.topic}>{ topic.get('title') }</Text>
              <Text style={styles.title}>{ question.get('title') }</Text>
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
              <HTMLView
                value={question.get('description')}
                stylesheet={styles}
                onLinkPress={this.onLinkPress}
              />
              <View style={styles.shareWrapper}>
                <Share id={question.get('id')} />
                <AddToFavorites id={question.get('id')} />
              </View>
              <LikeCount count={question.get('likeCount')} id={question.get('id')} />
            </View>
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
