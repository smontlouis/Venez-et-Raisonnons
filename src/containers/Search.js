import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import {
  Text,
  View
} from 'react-native';

// import * as SearchActions from '../redux/modules/search';


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Search = () =>
  <View style={styles.container}>
    <Text>
      SEARCH
    </Text>
  </View>
;

export default connect(
  state => ({

  }),
  // SearchActions,
)(Search);
