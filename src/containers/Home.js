import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as HomeActions from '../redux/modules/home';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


@connect(
  state => ({
    test: state.home.test,
  }),
  HomeActions,
)
export default class PleadApp extends Component {
  render() {
    const {
      test,
      changeTest,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={Actions.about}>
          HOME
        </Text>
        <Text style={styles.instructions} onPress={changeTest}>
          To get started, edit index.android.js {test} hh
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}
