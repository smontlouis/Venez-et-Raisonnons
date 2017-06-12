import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  QuestionSimple,
  QuestionStudy,
} from '@src/containers'
import * as AppActions from '@src/redux/modules/app'
import * as QuestionActions from '@src/redux/modules/questions'

const getCurrentQuestion = (state, props) => state.get('questions').get('questions').get(props.navigation.state.params.questionId)
const getTopics = state => state.get('topics').get('topics')

const getChildrenIdsByCurrentQuestion = (state, props) => getCurrentQuestion(state, props).get('children')
const getQuestions = state => state.get('questions').get('questions')

const getCurrentTopic = createSelector(
  [getCurrentQuestion, getTopics],
  (question, topics) => topics.get(question.get('topic'))
)

const getChildrenByQuestion = createSelector(
  [getChildrenIdsByCurrentQuestion, getQuestions],
  (questionsIds, questions) => questionsIds ? questionsIds.map(qID => questions.find(q => q.get('id') === qID)) : null, // eslint-disable-line no-confusing-arrow
)


@connect(
  (state, ownProps) => ({
    question: getCurrentQuestion(state, ownProps),
    topic: getCurrentTopic(state, ownProps),
    children: getChildrenByQuestion(state, ownProps)
  }),
  { ...AppActions, ...QuestionActions },
)
export default class Question extends Component {
  static propTypes = {
    children: PropTypes.object,
    fromStudy: PropTypes.bool,
    question: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired,
    setNotNewQuestion: PropTypes.func.isRequired,
    navigation: PropTypes.object,
  }

  componentDidMount() {
    const { navigation, setNotNewQuestion, question } = this.props
    if (navigation.state.params && navigation.state.params.isNew) setNotNewQuestion(question.get('id'))
  }

  render() {
    const { question, topic, markAsRead, children, fromStudy, navigation } = this.props

    if (children) {
      return (
        <QuestionStudy
          {...{ question, topic, children, navigation }}
        />
      )
    }

    return (
      <QuestionSimple
        {...{ question, topic, markAsRead, fromStudy, navigation }}
      />
    )
  }
}
