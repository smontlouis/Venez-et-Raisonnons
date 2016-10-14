import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import { Tabs } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default class MasterWithTabs extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        {children}
        <Tabs />
      </View>
    );
  }
}
