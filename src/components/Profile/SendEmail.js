import React from 'react'
import { View, TouchableOpacity } from 'glamorous-native'
import Toast from 'react-native-simple-toast'
import { FireAuth } from '@helpers'
import { Text } from '@ui'

const sendEmailNotification = () => {
  FireAuth.resendVerification()
  Toast.show('Email envoyé. Vérifiez votre boite.')
}

const SendEmail = () => (
  <View
    backgroundColor='red'
    padding={10}
    alignItems='center'
  >
    <Text sansSerif small>
      Vous n'avez pas encore vérifié votre compte !
    </Text>
    <TouchableOpacity onPress={sendEmailNotification}>
      <Text sansSerif small>
        Renvoyer le lien
      </Text>
    </TouchableOpacity>
  </View>
)

export default SendEmail
