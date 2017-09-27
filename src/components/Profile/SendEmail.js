import React from 'react'
import { View, TouchableOpacity } from 'glamorous-native'
import { SnackBar } from '@components'
import { FireAuth } from '@helpers'
import { Text } from '@ui'

const sendEmailNotification = () => {
  FireAuth.resendVerification()
  SnackBar.show('Email envoyé. Vérifiez votre boite.')
}

const SendEmail = () => (
  <View
    backgroundColor='red'
    padding={10}
    alignItems='center'
  >
    <Text sansSerif small>
      Un lien vous a été envoyé, merci de vérifier votre compte.
    </Text>
    <TouchableOpacity onPress={sendEmailNotification}>
      <Text sansSerif small underline>
        Renvoyer le lien
      </Text>
    </TouchableOpacity>
  </View>
)

export default SendEmail
