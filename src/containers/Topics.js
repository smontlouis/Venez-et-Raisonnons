import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  StatusBar,
} from 'react-native';
import {
  TopicsList,
  Header,
} from '../components';


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});


@connect(
  state => ({
    topics: state.topics.get('topics'),
  })
)
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
  }

  render() {
    const { topics } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Header
          title="Accueil"
          hasBackButton={false}
        />
        <TopicsList
          topics={topics}
        />
      </View>
    );
  }
}
