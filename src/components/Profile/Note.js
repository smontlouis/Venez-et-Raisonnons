// @flow

import React from 'react'
import { compose, pure } from 'recompose'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Card } from 'react-native-elements'
import glamorous from 'glamorous-native'
import distanceInWords from 'date-fns/distance_in_words'
import frLocale from 'date-fns/locale/fr'
import { Text, Box } from '@ui'
import { withBibleVerses, withLoading, formatVerseContent, truncate } from '@helpers'
import Livres from '@helpers/livres'

import { type Verse } from '../../types'
import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  date: number,
  verses: Array<Verse>,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  text: string
}

const DateText = glamorous.text((props, theme) => ({
  marginRight: 10,
  color: theme.colors.tertiary
}))

const NoteComponent = ({date, verses, navigation, text}: Props) => {
  const { title, content } = formatVerseContent(verses)
  const formattedDate = distanceInWords(Number(date), Date.now(), { locale: frLocale })
  const { Livre, Chapitre } = verses[0]
  const verseParams = {
    book: Livres[Number(Livre) - 1],
    chapter: Chapitre,
    arrayVerses: {
      book: Livres[Number(Livre) - 1],
      chapter: Chapitre,
      verses: verses.map(v => Number(v.Verset))
    }
  }

  const params = {
    date,
    formattedDate,
    title,
    content,
    verseParams
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('note', params)}>
      <Card>
        <Box row style={{ marginBottom: 10 }}>
          <Box flex row>
            <Text small sansSerif style={{ fontSize: 10, lineHeight: 12 }}>
              {`Vous avez ajouté une note concernant
`}<Text small sansSerif style={{ fontSize: 10, lineHeight: 12, fontWeight: 'bold' }}>{title}</Text>
            </Text>
          </Box>
          <DateText style={{ fontSize: 10 }}>Il y a {formattedDate}</DateText>
        </Box>
        <Text medium>{truncate(text, 120)}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default compose(
  pure,
  withBibleVerses('FRDBY', ({ verses }) => verses),
  withLoading(({ isLoading }) => isLoading),
  withNavigation
)(NoteComponent)
