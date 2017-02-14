/* global fetch */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  QuestionSimple,
  QuestionStudy,
} from '../containers'
import * as AppActions from '../redux/modules/app'

const getCurrentQuestion = (state, props) => state.questions.get('questions').get(props.questionId)
const getTopics = state => state.topics.get('topics')

const getChildrenIdsByCurrentQuestion = (state, props) => getCurrentQuestion(state, props).get('children')
const getQuestions = state => state.questions.get('questions')

const getCurrentTopic = createSelector(
  [getCurrentQuestion, getTopics],
  (question, topics) => topics.get(question.get('topic'))
)

const getChildrenByQuestion = createSelector(
  [getChildrenIdsByCurrentQuestion, getQuestions],
  (questionsIds, questions) => questionsIds ? questionsIds.map(qID => questions.find(q => q.get('id') === qID)) : null, // eslint-disable-line no-confusing-arrow
)

const Question = ({ question, topic, markAsRead, children, fromStudy }) => {
  if (children) {
    return (
      <QuestionStudy
        {...{ question, topic, children }}
      />
    )
  }

  return (
    <QuestionSimple
      {...{ question, topic, markAsRead, fromStudy }}
    />
  )
}

Question.propTypes = {
  children: PropTypes.object,
  fromStudy: PropTypes.bool,
  question: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  markAsRead: PropTypes.func.isRequired,
}

export default connect(
  (state, ownProps) => ({
    question: getCurrentQuestion(state, ownProps),
    topic: getCurrentTopic(state, ownProps),
    children: getChildrenByQuestion(state, ownProps)
  }),
  AppActions,
)(Question)
