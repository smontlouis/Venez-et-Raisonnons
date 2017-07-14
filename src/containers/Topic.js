import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View, Platform } from 'react-native'
import {
  QuestionsList,
  ScrollableHeader
} from '@src/components'

const getCurrentTopic = (state, props) => state.get('topics').get('topics').get(props.navigation.state.params.topicId)
const getLocalImagePath = (state, props) => state.get('topics').get('localImages').get(props.navigation.state.params.topicId)
const getQuestions = state => state.get('questions').get('questions')

const getQuestionsByTopic = createSelector(
  [getCurrentTopic, getQuestions],
  (currentTopic, questions) => questions
    .filter(question => question.get('topic') === currentTopic.get('id'))
    .filter(question => question.get('standalone'))
)

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

@connect(
  (state, ownProps) => ({
    topic: getCurrentTopic(state, ownProps),
    localImage: getLocalImagePath(state, ownProps),
    questions: getQuestionsByTopic(state, ownProps)
  })
)
export default class Topic extends Component {
  static propTypes = {
    localImage: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired
  }

  render () {
    const { topic, questions, localImage } = this.props
    const img = Platform.OS === 'android' ? `file://${localImage}` : localImage

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={topic.get('title')}
          image={img}
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
