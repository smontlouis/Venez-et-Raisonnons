import React, { Component, PropTypes } from 'react';
import {
  ListView,
} from 'react-native';

class List extends Component {
  static propTypes = {
    listItems: PropTypes.object.isRequired,
    renderRow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (oldRow, newRow) => oldRow !== newRow,
    });

    const data = props.listItems;

    this.state = {
      dataSource: dataSource.cloneWithRows(data.toJS())
    };
  }

  componentWillReceiveProps({ listItems: nextListItems }) {
    const { listItems } = this.props;
    const { dataSource } = this.state;

    if (nextListItems !== listItems) {
      this.setState({
        dataSource: dataSource.cloneWithRows(nextListItems.toJS())
      });
    }
  }

  render() {
    const { renderRow } = this.props;

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={renderRow}
      />
    );
  }
}

export default List;
