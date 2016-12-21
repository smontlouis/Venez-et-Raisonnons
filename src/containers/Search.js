import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import R from 'ramda'
import {
  Text,
  View
} from 'react-native'
import * as SearchActions from '../redux/modules/search'
import {
  SearchHeader,
  QuestionsList,
} from '../components'

const getSearchInput = state => state.search.get('input')
const getQuestions = state => state.questions.get('questions')

const findQuestion = input => question => question.get('title').toLowerCase().includes(input.toLowerCase())

const filterQuestionsBySearch = createSelector(
  [getSearchInput, getQuestions],
  (input, questions) => R.pipe(
    R.filter(findQuestion(input)),
    R.slice(0, 20)
  )(questions)
)

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})

const IfQuestions = (questions) => {
  if (questions.isEmpty()) {
    return (
      <View>
        <Text>
          Pas de résultats
        </Text>
      </View>
    )
  }

  return (
    <QuestionsList
      questions={questions}
    />
  )
}

const Search = ({ questions, setSearchInput }) =>
  <View style={styles.container}>
    <SearchHeader
      placeholder="Recherche..."
      title="Recherche"
      hasBackButton={false}
      onChangeText={setSearchInput}
    />
    {IfQuestions(questions)}
  </View>


Search.propTypes = {
  questions: PropTypes.object.isRequired,
  setSearchInput: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    questions: filterQuestionsBySearch(state),
  }),
  SearchActions,
)(Search)
