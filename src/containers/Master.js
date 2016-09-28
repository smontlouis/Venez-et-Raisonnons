import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import Tabs from '../components/Tabs';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

@connect(
  ({ app }) => ({
    isReady: app.get('isRehydrated'),
  }),
  null,
)
export default class Master extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isReady: PropTypes.bool.isRequired,
  }

  render() {
    const { children, isReady } = this.props;

    if (!isReady) {
      return (
        <View>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {children}
        <Tabs />
      </View>
    );
  }
}
