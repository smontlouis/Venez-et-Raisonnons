import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Modal from 'react-native-modalbox'
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
    fontWeight: '300',
    color: '#FF3366', // pink links
  },

  // Modal
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
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
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.responseContainer}>
              <Text style={styles.subTitle}>Réponse</Text>
              <HTMLView
                value={question.get('description')}
                stylesheet={styles}
                onLinkPress={url => this.modal.open()}
              />
              <View style={styles.shareWrapper}>
                <Share id={question.get('id')} />
                <AddToFavorites id={question.get('id')} />
              </View>
              <LikeCount count={question.get('likeCount')} id={question.get('id')} />
            </View>
          </ScrollView>
        </ScrollableHeader>
        <Modal
          style={styles.modal}
          position="bottom"
          ref={c => this.modal = c}
        >
          <Text style={styles.text}>Modal on bottom with backdrop</Text>
        </Modal>
      </View>
    )
  }
}
