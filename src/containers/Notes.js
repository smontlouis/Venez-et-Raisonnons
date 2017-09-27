// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Container } from '@ui'
import { Header, NoItems, NotesList } from '@components'

type Props = {
  notes: Object
}

const sortNotes = (notes) => Object
                              .keys(notes)
                              .sort((a, b) => b - a)
                              .map((k, i) => notes[k])

const NotesContainer = compose(
  branch(
    ({ notes }: Props) => notes.isEmpty(),
    renderComponent(() =>
      <NoItems
        icon='event-note'
        text='Aucune note'
      />
    )
  )
)(({ notes }: Props) => {
  const sortedNotes = sortNotes(notes.toJS())
  return (
    <NotesList
      notes={sortedNotes}
    />
  )
})

const Notes = ({ notes }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Notes'
    />
    <NotesContainer notes={notes} />
  </Container>
)

export default compose(
  pure,
  connect((state) => ({ notes: state.getIn(['user', 'bible', 'notes']) }))
)(Notes)
