import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import R from 'ramda'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
} from 'react-native'
import {
  QuestionsList,
  ScrollableHeader,
} from '../components'


const getCurrentTopic = (state, props) => state.topics.get('topics').get(props.topicId)
const getBase64Img = (state, props) => state.topics.get('base64Images').get(props.topicId)
const getQuestions = state => state.questions.get('questions')

const getQuestionsByTopic = createSelector(
  [getCurrentTopic, getQuestions],
  (currentTopic, questions) => questions
    .filter(question => question.get('topic') === currentTopic.get('id'))
    .filter(question => question.get('standalone')),
)

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

@connect(
  (state, ownProps) => ({
    topic: getCurrentTopic(state, ownProps),
    base64Img: getBase64Img(state, ownProps),
    questions: getQuestionsByTopic(state, ownProps),
  })
)
export default class Topic extends Component {
  static propTypes = {
    base64Img: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
  }

  render() {
    const { topic, questions, base64Img } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={topic.get('title')}
          image={`data:image/gif;base64,${base64Img}`}
        >
          <QuestionsList
            questions={questions}
            questionsCount={questions.count()}
            headerTitle={topic.get('title')}
          />
        </ScrollableHeader>
      </View>
    )
  }
}
