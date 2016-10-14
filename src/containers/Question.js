import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Header } from '../components';
import * as QuestionsActions from '../redux/modules/questions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const getCurrentQuestion = (state, props) => state.questions.get('questions').get(props.params.questionId);

@connect(
  (state, ownProps) => ({
    question: getCurrentQuestion(state, ownProps),
  }),
  QuestionsActions,
)
export default class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  render() {
    const { question } = this.props;
    return (
      <View style={styles.container}>
        <Header title="Question" />
        <Text>Question { question.get('title') }</Text>
      </View>
    );
  }
}
