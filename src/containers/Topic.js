import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as QuestionsActions from '../redux/modules/questions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


@connect(
  (state, ownProps) => ({
    topic: state.topics.get('topics').get(ownProps.params.topicId),
  }),
  QuestionsActions,
)
export default class Topics extends Component {
  static propTypes = {
    loadQuestions: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loadQuestions, params } = this.props;
    loadQuestions(params.topicId);
  }

  render() {
    const { topic } = this.props;
    return (
      <View style={styles.container}>
        <Text> TOPIC {topic.get('id')} </Text>
      </View>
    );
  }
}
