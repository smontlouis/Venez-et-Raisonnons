import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
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

  onPressButton(rowID, rowData) {
    console.log(rowData);
  }

  renderRow(rowData, rowID) {
    console.log(rowData);
    return (
      <TouchableHighlight underlayColor={'#ccc'} onPress={() => this.onPressButton(rowID, rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>{rowData.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
