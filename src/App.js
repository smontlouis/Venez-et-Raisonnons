import React, { Component } from 'react';
import { Provider } from 'react-redux';
import immutableTransform from 'redux-persist-transform-immutable';
import { persistStore } from 'redux-persist';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  AsyncStorage,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import routes from './routes';
import configureStore from './redux/store';
import globalVariables from './helpers/globalVariables';

export const store = configureStore();
EStyleSheet.build(globalVariables);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});


class App extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, {
      storage: AsyncStorage,
      blacklist: ['app'],
      transforms: [immutableTransform()]
    }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        // @TODO - Create a loading component
        <View style={styles.container}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }
    return (
      <Provider store={store}>
        { routes(store) }
      </Provider>
    );
  }
}

export default App;
