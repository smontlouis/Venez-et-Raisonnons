import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import {
  AsyncStorage,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { store } from '../App';
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
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log('purged', store);
          persistStore(store, {
            storage: AsyncStorage,
            blacklist: ['app'],
            transforms: [immutableTransform()]
          }, () => {}).purge();
        }}
      >
        <Text>Purge</Text>
      </TouchableOpacity>
    </View>
  </View>
;

export default connect(
  state => ({

  }),
  // FavoritesActions,
)(More);
