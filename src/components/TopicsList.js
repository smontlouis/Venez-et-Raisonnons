import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-native';
import {
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class TopicsList extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (oldRow, newRow) => oldRow !== newRow,
    });

    const data = props.topics;

    this.state = {
      dataSource: dataSource.cloneWithRows(data.toJS())
    };
  }

  componentWillReceiveProps({ topics: nextTopics }) {
    const { topics } = this.props;
    const { dataSource } = this.state;

    if (nextTopics !== topics) {
      this.setState({
        dataSource: dataSource.cloneWithRows(nextTopics.toJS())
      });
    }
  }

  renderRow({ id, title }) {
    return (
      <Link to={`/topics/${id}`}>
        <View style={styles.row}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Link>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export default TopicsList;
