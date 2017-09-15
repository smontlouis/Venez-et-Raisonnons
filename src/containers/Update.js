import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import ShowDown from 'showdown'

import {
  View,
  ScrollView
} from 'react-native'
import {
  Header,
  StylizedHTMLView
} from '@src/components'

const converter = new ShowDown.Converter()

const markdownToHtml = converter.makeHtml(
`Une nouvelle mise à jour contenant beaucoup de nouveautés arrive fin-septembre !

Afin de ne pas perdre vos données lors de la mise à jour, il est fortement recommandé de sauvegarder vos données en vous créant un compte dans Plus -> Connexion.

Une fois connecté, votre activité sera automatiquement synchronisée dans le cloud. Vous pourrez ensuite retrouver vos questions lues / favories / likées en vous connectant avec votre compte !

`)

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    padding: 25
  }
})

const Update = () =>
  <View style={styles.container}>
    <Header
      title='Ne perdez pas vos données !'
    />
    <ScrollView contentContainerStyle={styles.content}>
      <StylizedHTMLView
        value={markdownToHtml}
      />
    </ScrollView>

  </View>

export default Update
