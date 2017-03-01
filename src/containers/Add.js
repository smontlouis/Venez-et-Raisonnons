import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Button } from 'react-native-elements'
import {
  Text,
  View,
  Linking,
} from 'react-native'
import {
  Header,
} from '../components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '$color.primary',
    borderRadius: 5,
  }
})

const mailTo = () => {
  Linking.openURL('mailto:venezetraisonnons@gmail.com?subject=Nouvelle question')
}

const Add = () =>
  <View style={styles.container}>
    <Header
      title="Poser une question"
      hasBackButton={false}
    />
    <View style={styles.centered}>
      <Text style={styles.text}>
        {'Vous souhaitez nous posez une question ? \n\n Merci de nous envoyer un mail avec le titre de votre question et votre nom (facultatif). Notre équipe s\'engage à vous répondre sous 15 jours. \n\n En cas de validation, vous recevrez un mail lorsque la réponse sera disponible dans l\'application.'}
      </Text>
      <Button
        icon={{ name: 'email' }}
        title="Envoyer un mail"
        buttonStyle={styles.button}
        onPress={mailTo}
      />
    </View>
  </View>


export default Add
