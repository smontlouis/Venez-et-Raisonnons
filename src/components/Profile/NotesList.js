// @flow

import React from 'react'
import { FlatList } from 'react-native'
import { compose, pure } from 'recompose'
import { Container } from '@ui'
import NoteComponent from './Note'

type Props = {
  notes: Array<{
    date: number,
    text: string,
    verseIds: Object
  }>
}

const NotesList = ({ notes }: Props) => {
  return (
    <Container grey>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => item.date}
        renderItem={({ item: { date, text, verseIds } }: any) => {
          const formattedVerses = Object.keys(verseIds).map(v => {
            const [Livre, Chapitre, Verset] = v.split('-').map(Number)
            return { Livre, Chapitre, Verset, Texte: '' }
          })
          return (
            <NoteComponent {...{ date, text }} verses={formattedVerses} />
          )
        }}
      />
    </Container>
  )
}

export default compose(
  pure
)(NotesList)
