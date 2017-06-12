import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { View, StatusBar } from 'react-native'
import {
  Header,
  QuestionsList,
  NoItems
} from '@src/components'

const getFavoritesIds = state => state.get('app').get('favorites')
const getQuestions = state => state.get('questions').get('questions')

const filterQuestionsByFavorites = createSelector(
  [getFavoritesIds, getQuestions],
  (ids, questions) => questions.filter(q => ids.find((v, k) => k === q.get('id')))
)

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

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
  <View style={styles.container}>
    <StatusBar barStyle='light-content' />
    <Header
      title='Favoris'
      hasBackButton={false}
    />
    {IfQuestions(questions)}
  </View>
)

Favorites.propTypes = {
  questions: PropTypes.object.isRequired
}

export default connect(
  state => ({
    questions: filterQuestionsByFavorites(state)
  })
)(Favorites)
