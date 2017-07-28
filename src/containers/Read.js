// @flow

import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { StatusBar } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Container } from '@ui'
import { Header, QuestionsList, NoItems } from '@components'

const getHasBeenReadIds = state => state.getIn(['user', 'questions', 'hasBeenRead'])
const getQuestions = state => state.get('questions').get('questions')

const filterQuestionsByHasBeenRead = createSelector(
  [getHasBeenReadIds, getQuestions],
  (ids, questions) => questions.filter(q => ids.find((v, k) => k === q.get('id')))
)

type Props = {
  questions: Object
}

const Questions = compose(
  branch(
    ({ questions }: Props) => questions.isEmpty(),
    renderComponent(() =>
      <NoItems
        icon='bookmark-border'
        text="Aucune étude faite pour l'instant"
      />
    )
  )
)(({ questions }: Props) =>
  <QuestionsList
    questions={questions}
  />
)

const Read = ({ questions }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Études lues'
    />
    <Questions questions={questions} />
  </Container>
)

export default compose(
  connect(
    state => ({
      questions: filterQuestionsByHasBeenRead(state)
    })
  ),
  pure
)(Read)
