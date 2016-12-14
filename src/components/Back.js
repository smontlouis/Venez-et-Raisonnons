import React, { Component, PropTypes } from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

class Back extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handlePress = ::this.handlePress;
  }

  handlePress() {
    const { navigator } = this.props;

    navigator.pop();
  }

  render() {
    return (
      <TouchableHighlight {...this.props} onPress={this.handlePress} />
    );
  }
}

export default withNavigation(Back);
