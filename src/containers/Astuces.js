import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import ShowDown from 'showdown'

import {
  View,
  ScrollView,
} from 'react-native'
import {
  Header,
  StylizedHTMLView
} from '@src/components'

const converter = new ShowDown.Converter()

const markdownToHtml = converter.makeHtml(
`→ L'application peut faire preuve parfois de quelques ralentissements, la Bible Strong étant très lourde à gérer selon les mobiles

→ Vous pouvez swiper entre les différents chapitres et les mots strong afin de changer de page

→ Il est possible de retourner à l'accueil en appuyant longuement sur le bouton retour

→ Les questions en *vert* sont des études, elles sont séparées en plusieurs sous-questions
`)


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 25,
  }
})

const Astuces = () =>
  <View style={styles.container}>
    <Header
      title="Astuces"
    />
    <ScrollView contentContainerStyle={styles.content}>
      <StylizedHTMLView
        value={markdownToHtml}
      />
    </ScrollView>

  </View>


export default Astuces
