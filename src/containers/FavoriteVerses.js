// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Container } from '@ui'
import { Header, NoItems, VersesList } from '@components'

type Props = {
  itemIds: Object
}

const Verses = compose(
  branch(
    ({ itemIds }: Props) => itemIds.isEmpty(),
    renderComponent(() =>
      <NoItems
        icon='bookmark-border'
        text='Aucun favori'
      />
    )
  )
)(({ itemIds }: Props) =>
  <VersesList
    itemIds={itemIds}
  />
)

const FavoriteVerses = ({ itemIds }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Favoris'
    />
    <Verses itemIds={itemIds} />
  </Container>
)

export default compose(
  pure,
  connect((state) => ({ itemIds: state.getIn(['user', 'bible', 'favorites']) }))
)(FavoriteVerses)
