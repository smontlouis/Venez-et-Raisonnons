import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as TopicsActions from '../redux/modules/topics';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Topics = () =>
  <View style={styles.container}>
    <Text>
      TOPICS
    </Text>
  </View>
;

export default connect(
  state => ({

  }),
  TopicsActions,
)(Topics);
