import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import * as FavoritesActions from '../redux/modules/favorites';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Profile = () =>
  <View style={styles.container}>
    <Text>
      PROFILE
    </Text>
  </View>
;

export default connect(
  state => ({

  }),
  // FavoritesActions,
)(Profile);