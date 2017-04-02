import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View } from 'react-native'
import { NavigationStyles } from '@expo/ex-navigation'
import { Header, BibleViewer } from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

type BibleProps = {
  book: object,
  chapter: number,
  verse: number,
  version: string,
}

const BibleLight = ({ book = { Numero: 1, Nom: 'Genèse', Chapitres: 50 }, chapter = 1, verse = 1, version = 'STRONG' }: BibleProps) =>
  <View style={styles.container}>
    <Header
      title={`${book.Nom} ${chapter}:${verse}`}
      isModal
    />
    <BibleViewer
      noArrows
      book={book}
      chapter={chapter}
      verse={verse}
      version={version}
    />
  </View>

BibleLight.route = {
  styles: {
    ...NavigationStyles.FloatVertical,
    gestures: null,
  }
}

export default BibleLight
