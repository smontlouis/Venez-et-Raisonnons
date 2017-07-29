// @flow

import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { StatusBar } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Container } from '@ui'
import { Header, QuestionsList, NoItems } from '@components'

const getFavoriteIds = state => state.getIn(['user', 'questions', 'favorites'])
const getQuestions = state => state.get('questions').get('questions')

const filterQuestionsByFavorites = createSelector(
  [getFavoriteIds, getQuestions],
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
        text='Aucun favori'
      />
    )
  )
)(({ questions }: Props) =>
  <QuestionsList
    questions={questions}
  />
)

const Favorites = ({ questions }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Favoris'
    />
    <Questions questions={questions} />
  </Container>
)

export default compose(
  pure,
  connect(
    state => ({
      questions: filterQuestionsByFavorites(state)
    })
  )
)(Favorites)
