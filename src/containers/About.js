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
`La Bible est aujourd'hui le livre le plus traduit dans le monde. Chaque jour, des millions de personnes en quête de vérité tournent les pages de ce livre inspiré, pour y découvrir Dieu, apprendre à mieux le connaître, ou encore afin d'y trouver des réponses pertinentes à une vie pleine d'inquiétudes et de questionnements.

Les saintes Écritures sont une source intarissable de lumière et de vérité. En avoir une lecture linéaire et littérale ne suffit pas pour en comprendre le sens profond. Le véritable chercheur en quête de vérité devra creuser avec persévérance dans la Parole de Dieu par des études minutieuses et la prière afin d'affermir sa foi.

Les outils efficaces d'étude de la Bible se sont développés à travers les siècles mais le monde francophone demeure encore pauvre en la matière. L'étude approfondie des Textes sacrés ne semble aujourd'hui réservée qu'à une certaine élite, capable de suivre des cursus théologiques ou encore d'apprendre des langues anciennes ou étrangères.

Est-ce une fatalité ?

## Qui-sommes-nous ?

Nous sommes un groupe de jeunes chrétiens persuadés que Dieu s'adresse par sa parole à toute âme sincère qui désire le connaître et que l'étude de la Bible n'est pas une question d'élitisme intellectuel. Nous souhaitons aider à la propagation de la Parole de Dieu dans le milieu francophone ainsi qu'à favoriser son étude.

## Le projet

Le projet "Venez et Raisonnons" a pour objectif la mise à disposition d'outils efficaces d'étude de la Bible pour tous ceux qui souhaitent développer et affermir une foi réfléchie en Dieu par sa Parole.

Pour ce faire, nous développons une application mobile iOS/Android/Windows Phone/Web contenant :

Des études bibliques claires et concises traitant de sujets divers et variés.
Des questions fréquemment posées avec les réponses que la Parole de Dieu y apporte
La possibilité de nous poser vous mêmes vos questions et d'en recevoir une réponse claire basée sur la Bible
Différentes versions de la Bible
Un dictionnaire biblique
Une version de la Bible contenant les STRONG* hébreux et grec

Ainsi que d'autres supports et outils d'études à venir par la suite.

Nous sommes persuadés que tout cela sera d’une grande aide pour le monde francophone chrétien mais pour mener à terme un tel projet nous avons aussi besoin de votre aide. C’est la raison pour laquelle nous vous demandons de prendre part vous aussi à cette initiative en nous soutenant pour vos dons.

v2.0.0
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

const About = () =>
  <View style={styles.container}>
    <Header
      title="À propos"
    />
    <ScrollView contentContainerStyle={styles.content}>
      <StylizedHTMLView
        value={markdownToHtml}
      />
    </ScrollView>

  </View>


export default About
