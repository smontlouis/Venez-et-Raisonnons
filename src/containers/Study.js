import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import {
  QuestionsList,
  ScrollableHeader,
} from '@src/components'
import { HTMLView } from '@src/helpers'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 35,
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
  topic: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontFamily: '$font.title',
    color: 'white',
    fontSize: 27,
    lineHeight: 38,
    width: '80%',
    marginTop: 5,
  },

  // HTML View
  p: {
    lineHeight: 22,
    fontSize: 16,
  },
  a: {
    fontWeight: 'bold',
    color: '$color.primary',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
  },
})

const getCurrentStudy = (state, props) => state.get('studies').get('studies').get(props.studyId)
const getQuestionsIdsByCurrentStudy = (state, props) => getCurrentStudy(state, props).get('questions')
const getQuestions = state => state.get('questions').get('questions')

const getQuestionsByStudy = createSelector(
  [getQuestionsIdsByCurrentStudy, getQuestions],
  (questionsIds, questions) => questionsIds ? questionsIds.map(qID => questions.find(q => q.get('id') === qID)) : null, // eslint-disable-line no-confusing-arrow
)

@connect(
  (state, ownProps) => ({
    study: getCurrentStudy(state, ownProps),
    questions: getQuestionsByStudy(state, ownProps),
  })
)
export default class Study extends Component {
  static propTypes = {
    study: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
  }

  render() {
    const { study, questions } = this.props
    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={study.get('title')}
          headerStyle={{ backgroundColor: '#1A806F' }}
          header={(
            <View style={styles.header}>
              <Text style={styles.topic}>Étude Biblique</Text>
              <Text style={styles.title}>{ study.get('title') }</Text>
            </View>
          )}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.responseContainer}>
              <HTMLView
                value={study.get('text')}
                stylesheet={styles}
              />
            </View>
            {
              questions &&
              <QuestionsList
                questions={questions}
                withCounting
              />
            }
          </ScrollView>
        </ScrollableHeader>
      </View>
    )
  }
}
