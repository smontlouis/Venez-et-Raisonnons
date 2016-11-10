import React, { Component, PropTypes } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  StatusBar,
} from 'react-native';

import { Tabs } from '../components';

const styles = EStyleSheet.create({
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
