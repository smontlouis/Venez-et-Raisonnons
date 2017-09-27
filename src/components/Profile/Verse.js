// @flow

import React from 'react'
import { compose, pure } from 'recompose'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Card, Icon } from 'react-native-elements'
import glamorous from 'glamorous-native'
import distanceInWords from 'date-fns/distance_in_words'
import frLocale from 'date-fns/locale/fr'
import { Title, Text, Box } from '@ui'
import { withBibleVerses, withLoading, formatVerseContent, truncate } from '@helpers'
import Livres from '@helpers/livres'

import { type Verse } from '../../types'
import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  date: number,
  verses: Array<Verse>,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  isHighlight?: bool,
  isFavorite?: bool
}

const DateText = glamorous.text((props, theme) => ({
  color: theme.colors.tertiary
}))

const Circle = glamorous(Box)((_, theme) => ({
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.colors.secondary,
  marginRight: 5,
  marginTop: 5
}))

const BookMarkIcon = glamorous(Icon)({
  marginTop: 4,
  marginRight: 5
})

const VerseComponent = ({date, verses, navigation, isFavorite, isHighlight}: Props) => {
  const { title, content } = formatVerseContent(verses)
  const formattedDate = distanceInWords(Number(date), Date.now(), { locale: frLocale })
  const { Livre, Chapitre } = verses[0]
  const params = {
    book: Livres[Number(Livre) - 1],
    chapter: Chapitre,
    arrayVerses: {
      book: Livres[Number(Livre) - 1],
      chapter: Chapitre,
      verses: verses.map(v => Number(v.Verset))
    }
  }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('bible', params)}>
      <Card title={false}>
        <Box row style={{ marginBottom: 10 }}>
          <Box flex row>
            { isHighlight && <Circle /> }
            {
              isFavorite &&
              <BookMarkIcon
                name={'bookmark'}
                size={15}
                color='#C22839'
              />
            }
            <Title secondaryFont style={{ fontSize: 18, lineHeight: 20 }}>{title}</Title>
          </Box>
          <DateText style={{ fontSize: 10 }}>Il y a {formattedDate}</DateText>
        </Box>
        <Text medium>{truncate(content, 200)}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default compose(
  pure,
  withBibleVerses('FRDBY', ({ verses }) => verses),
  withLoading(({ isLoading }) => isLoading),
  withNavigation
)(VerseComponent)
