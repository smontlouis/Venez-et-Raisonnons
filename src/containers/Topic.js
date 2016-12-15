import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
} from 'react-native';
import {
  QuestionsList,
  ScrollableHeader,
} from '../components';
import * as QuestionsActions from '../redux/modules/questions';


const getCurrentTopic = (state, props) => state.topics.get('topics').get(props.topicId);
const getQuestions = state => state.questions.get('questions');
const getListeningQuestionsByTopic = (state, props) => state.app.get('hasQuestionsByTopicListening').get(props.topicId);

const getQuestionsByTopic = createSelector(
  [getCurrentTopic, getQuestions],
  (currentTopic, questions) => R.filter(question => (question.get('topic') === currentTopic.get('id')), questions),
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

@connect(
  (state, ownProps) => ({
    topic: getCurrentTopic(state, ownProps),
    questions: getQuestionsByTopic(state, ownProps),
    isListening: getListeningQuestionsByTopic(state, ownProps),
  }),
  QuestionsActions,
)
export default class Topic extends Component {
  static propTypes = {
    isListening: PropTypes.bool,
    loadQuestions: PropTypes.func.isRequired,
    topicId: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loadQuestions, topicId, isListening } = this.props;
    !isListening && loadQuestions(topicId);
  }

  render() {
    const { topic, questions } = this.props;

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title={topic.get('title')}
          image={topic.get('image_url')}
        >
          <QuestionsList
            questions={questions}
            questionsCount={topic.get('questionsCount')}
            headerTitle={topic.get('title')}
          />
        </ScrollableHeader>
      </View>
    );
  }
}
