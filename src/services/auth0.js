import Auth0Lock from 'react-native-lock'
import { Platform } from 'react-native'

import env from '@src/env'
import * as AuthStateActions from '@src/redux/modules/auth'
import { store } from '@src/App'

const {
  clientId,
  domain
} = env.auth0

const authenticationEnabled = clientId && domain

let lock = null
if (authenticationEnabled) {
  lock = new Auth0Lock({
    clientId,
    domain
  })
} else {
  console.warn('Authentication not enabled: Auth0 configuration not provided')
}

export function showLogin () {
  if (!authenticationEnabled) {
    return
  }

  const lockOptions = {
    closable: false,
    dict: 'fr',
    icon: 'https://image.freepik.com/icones-gratuites/facebook-logo-bouton_318-84980.png',
    socialBigButtons: true
  }

  if (Platform.OS === 'ios') {
    // lock.customizeTheme({
    //   A0ThemePrimaryButtonNormalColor: '#39babd',
    //   A0ThemePrimaryButtonHighlightedColor: '#08AFB3',
    //   A0ThemeSecondaryButtonTextColor: '#ffffff',
    //   A0ThemeTextFieldTextColor: '#ffffff',
    //   A0ThemeTextFieldPlaceholderTextColor: '#ffffff',
    //   A0ThemeTextFieldIconColor: '#ffffff',
    //   A0ThemeTitleTextColor: '#ffffff',
    //   A0ThemeDescriptionTextColor: '#ffffff',
    //   A0ThemeSeparatorTextColor: '#ffffff',
    //   A0ThemeScreenBackgroundColor: '#39babd',
    //   A0ThemeIconImageName: 'pepperoni',
    //   A0ThemeCredentialBoxBorderColor: '' // transparent
    // })
  }

  lock.show(lockOptions, (err, profile, token) => {
    if (err) {
      console.log(err)
      store.dispatch(AuthStateActions.onUserLoginError(err))
      return
    }

    // Authentication worked!
    store.dispatch(AuthStateActions.onUserLoginSuccess(profile, token))
  })
}
