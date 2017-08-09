// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Container } from '@ui'
import { Header, NoItems, VersesList } from '@components'

type Props = {
  verseIds: Object
}

const Verses = compose(
  branch(
    ({ verseIds }: Props) => verseIds.isEmpty(),
    renderComponent(() =>
      <NoItems
        icon='border-color'
        text='Aucune surbrillance'
      />
    )
  )
)(({ verseIds }: Props) =>
  <VersesList
    verseIds={verseIds.toJS()}
    isHighlight
  />
)

const FavoriteVerses = ({ verseIds }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Surbrillances'
    />
    <Verses verseIds={verseIds} />
  </Container>
)

export default compose(
  pure,
  connect((state) => ({ verseIds: state.getIn(['user', 'bible', 'highlights']) }))
)(FavoriteVerses)
