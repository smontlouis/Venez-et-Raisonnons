import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class Master extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}
