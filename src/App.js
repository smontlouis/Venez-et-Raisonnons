import React, { Component } from 'react'
import { Provider } from 'react-redux'
import immutableTransform from 'redux-persist-transform-immutable'
import { persistStore } from 'redux-persist'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  AsyncStorage,
} from 'react-native'

import routes from './routes'
import configureStore from './redux/store'
import globalVariables from './helpers/globalVariables'

import {
  Loading
} from './components'

export const store = configureStore()
export let persistedStore = null // eslint-disable-line import/no-mutable-exports

EStyleSheet.build(globalVariables)

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
      transforms: [immutableTransform()]
    }, () => {
      this.setState({ rehydrated: true })
    })
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
