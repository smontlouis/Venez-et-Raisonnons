import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist-immutable'
import EStyleSheet from 'react-native-extended-stylesheet'
import codePush from 'react-native-code-push'
import { AsyncStorage, Platform } from 'react-native'
import { ThemeProvider } from 'glamorous-native'

import Master from './containers/Master'
import Routes from './routes'
import configureStore from './redux/store'
import theme from './themes/default'
import { globalVariables } from './helpers'
import { Loading } from './components'
import { initDB } from './helpers/database'

// import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf'

export const store = configureStore()
export let persistedStore = null

console.disableYellowBox = true
EStyleSheet.build(globalVariables)

@codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })
class App extends Component {
  state = { rehydrated: false }

  componentWillMount () {
    const persistStorePromise = new Promise((resolve) => {
      persistedStore = persistStore(store, { storage: AsyncStorage }, () => resolve())
      return persistStore
    })

    Promise.all([ persistStorePromise, initDB ])
      .then(() => this.setState({ rehydrated: true }))

    // PerfMonitor.toggle()
    // setTimeout(() => {
    //   PerfMonitor.start()
    //   setTimeout(() => {
    //     PerfMonitor.stop()
    //   }, 10000)
    // }, 5000)
  }

  render () {
    if (Platform.OS === 'android') {
      if (!this.state.rehydrated) {
        return (
          <Loading />
        )
      }
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Master>
            <Routes onNavigationStateChange={null} />
          </Master>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
