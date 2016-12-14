import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Text,
  View
} from 'react-native';
import {
  Header,
} from '../components';
// import * as FavoritesActions from '../redux/modules/favorites';


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const More = () =>
  <View style={styles.container}>
    <Header
      title="Plus"
      hasBackButton={false}
    />
  </View>
;

export default connect(
  state => ({

  }),
  // FavoritesActions,
)(More);
