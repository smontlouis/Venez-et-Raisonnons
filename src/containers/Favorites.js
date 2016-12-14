import React, { PropTypes } from 'react';
// import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import {
  // Text,
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

const Favorites = () =>
  <View style={styles.container}>
    <Header
      title="Favoris"
      hasBackButton={false}
    />
  </View>
;

export default connect(
  state => ({

  }),
  // FavoritesActions,
)(Favorites);
