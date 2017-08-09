// @flow

import React from 'react'
import { ScrollView, FlatList } from 'react-native'
import { compose, pure } from 'recompose'
import { Container } from '@ui'
import VerseComponent from './Verse'

import { type Verse } from '../../types'

type VersesByDate = {
  date: string,
  verses: Verse[]
}

type SortedVerses = Array<VersesByDate>

type VerseIds = {
  [verse: string]: string
}

type Props = {
  verseIds: VerseIds,
  isHighlight?: bool,
  isFavorite?: bool
}

const sortVersesByDate = (p: VerseIds): SortedVerses => (
  Object.keys(p)
    .reduce((arr: SortedVerses, verse: string, i: number) => {
      const [Livre, Chapitre, Verset] = verse.split('-').map(Number)
      const formattedVerse:Verse = { Livre, Chapitre, Verset, Texte: '' } // 1-1-1 to { livre: 1, chapitre: 1, verset: 1}

      if (!arr.find(a => a.date === p[verse])) {
        arr.push({ date: p[verse], verses: [] })
      }

      const dateInArray = arr.find(a => a.date === p[verse])
      if (dateInArray) {
        dateInArray.verses.push(formattedVerse)
        dateInArray.verses.sort((a: Verse, b: Verse) => Number(a.Verset) - Number(b.Verset))
      }

      arr.sort((a: VersesByDate, b: VersesByDate) => Number(b.date) - Number(a.date))
      return arr
    }, [])
)

const VersesList = ({ verseIds, isHighlight, isFavorite }: Props) => {
  const sortedVersesByDate = sortVersesByDate(verseIds)
  return (
    <Container grey>
      <FlatList
        data={sortedVersesByDate}
        keyExtractor={(item, index) => item.date}
        renderItem={({ item: { date, verses } }: any) => (
          <VerseComponent {...{date, verses, isHighlight, isFavorite}} />
        )}
      />
    </Container>
  )
}

export default compose(
  pure
)(VersesList)
