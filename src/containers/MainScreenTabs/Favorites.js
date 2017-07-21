import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { StatusBar } from 'react-native'
import { Container } from '@src/styled'
import { Header, QuestionsList, NoItems } from '@src/components'

const getFavoritesIds = state => state.getIn(['user', 'questions', 'favorites'])
const getQuestions = state => state.get('questions').get('questions')

const filterQuestionsByFavorites = createSelector(
  [getFavoritesIds, getQuestions],
  (ids, questions) => questions.filter(q => ids.find((v, k) => k === q.get('id')))
)

const IfQuestions = (questions) => {
  if (questions.isEmpty()) {
    return (
      <NoItems
        icon='bookmark-border'
        text='Aucun favori'
      />
    )
  }

  return (
    <QuestionsList
      questions={questions}
    />
  )
}

const Favorites = ({ questions }) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Favoris'
      hasBackButton={false}
    />
    {IfQuestions(questions)}
  </Container>
)

Favorites.propTypes = {
  questions: PropTypes.object.isRequired
}

export default connect(
  state => ({
    questions: filterQuestionsByFavorites(state)
  })
)(Favorites)
