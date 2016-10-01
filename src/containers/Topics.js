import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import TopicsList from '../components/TopicsList';
import * as TopicsActions from '../redux/modules/topics';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


@connect(
  state => ({
    topics: state.topics.get('topics'),
  }),
  TopicsActions,
)
export default class Topics extends Component {
  static propTypes = {
    loadTopics: PropTypes.func.isRequired,
    topics: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { loadTopics } = this.props;
    loadTopics();
  }

  render() {
    const { topics } = this.props;
    return (
      <View style={styles.container}>
        <TopicsList topics={topics} />
      </View>
    );
  }
}
