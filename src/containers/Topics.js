import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    TopicsList,
    SearchHeader,
} from '../components';
import * as TopicsActions from '../redux/modules/topics';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});


@connect(
  state => ({
    topics: state.topics.get('topics'),
    isListening: state.app.get('hasTopicsListening')
  }),
  TopicsActions,
)
export default class Topics extends Component {
  static propTypes = {
    isListening: PropTypes.bool.isRequired,
    loadTopics: PropTypes.func.isRequired,
    topics: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loadTopics, isListening } = this.props;
    !isListening && loadTopics();
  }

  render() {
    const { topics } = this.props;
    return (
      <View style={styles.container}>
        <SearchHeader />
        <TopicsList
          topics={topics}
        />
      </View>
    );
  }
}