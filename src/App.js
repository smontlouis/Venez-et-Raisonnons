import React, { Component } from 'react'
import { Provider } from 'react-redux'
import immutableTransform from 'redux-persist-transform-immutable'
import { persistStore } from 'redux-persist'
import EStyleSheet from 'react-native-extended-stylesheet'
import codePush from 'react-native-code-push'
import {
  AsyncStorage,
} from 'react-native'

import routes from './routes'
import configureStore from './redux/store'
import { globalVariables } from './helpers'

import {
  Loading
} from './components'

export const store = configureStore()
export let persistedStore = null // eslint-disable-line import/no-mutable-exports

EStyleSheet.build(globalVariables)

@codePush
class App extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistedStore = persistStore(store, {
      storage: AsyncStorage,
      transforms: [immutableTransform()],
    }, () => {
      this.setState({ rehydrated: true })
    })
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        persistedStore.purge()
        console.log('Installing update.')
        break
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        break
      default:
        return
    }
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <Loading />
      )
    }
    return (
      <Provider store={store}>
        { routes(store) }
      </Provider>
    )
  }
}

export default App
