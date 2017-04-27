import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist-immutable'
import EStyleSheet from 'react-native-extended-stylesheet'
import codePush from 'react-native-code-push'
import { AsyncStorage, Platform } from 'react-native'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'
import { ThemeProvider } from 'styled-components'

import Routes from './routes'
import configureStore from './redux/store'
import theme from './themes/default'
import { globalVariables } from './helpers'
import { Loading } from './components'

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
    }, () => {
      this.setState({ rehydrated: true })
    })
  }

  componentDidMount() {
    FCM.requestPermissions() // for iOS
    FCM.getFCMToken().then((token) => {
      console.log(token)
      // store fcm token in your server
    })
    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      // there are two parts of notif. notif.notification
      // contains the notification payload, notif.data contains data payload
      if (notif.local_notification) {
        // this is a local notification
        console.log('localnotification')
      }
      if (notif.opened_from_tray) {
        // app is open/resumed because user clicked banner
        console.log('openedfromtray')
      }

      if (Platform.OS ==='ios') {
        // optional
        // iOS requires developers to call completionHandler to end notification process.
        // If you do not call it your background remote notifications could be throttled,
        // to read more about it see the above documentation link.

        // This library handles it for you automatically with default behavior
        // However if you want to return different result, follow the following code to override
        // notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData)
            // other types available: RemoteNotificationResult.NewData, 
            // RemoteNotificationResult.ResultFailed
            break
          case NotificationType.NotificationResponse:
            notif.finish()
            break
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All) 
            // other types available: WillPresentNotificationResult.None
            break
          default:
            console.log('default')
        }
      }
    })

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    })
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
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
        // persistedStore.purge(['bible', 'questions', 'search', 'studies', 'topics'])
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
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
