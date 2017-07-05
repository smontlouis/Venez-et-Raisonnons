import React, { Component } from 'react'
import { Platform } from 'react-native'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'
import codePush from 'react-native-code-push'

const FCMInit = (WrappedComponent) => (
  class FCMComponent extends Component {
    componentDidMount () {
      FCM.setBadgeNumber(0)
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

        if (Platform.OS === 'ios') {
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

    codePushStatusDidChange (status) {
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
      }
    }

    componentWillUnmount () {
      // stop listening for events
      this.notificationListener.remove()
      this.refreshTokenListener.remove()
    }
    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
)

export default FCMInit
