// @flow
import React from 'react'
import Modal from 'react-native-modalbox'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import glam from 'glamorous-native'
import { Icon } from 'react-native-elements'
import { createSelector } from 'reselect'
import Toast from 'react-native-simple-toast'
import * as UserActions from '@src/redux/modules/user'

import { type Verse } from '@src/types'

type Props = {
  verses: Array<Verse>,
  isOpen: boolean,
  isSelectedVerseHighlighted: boolean,
  isSelectedVerseFavorited: boolean,
  toggleHighlight: Function,
  toggleVerseFavorite: Function,
  shareVerses: Function
}

const ModalBox = glam(Modal, { forwardProps: ['position', 'isOpen'] })({
  backgroundColor: '#f9f9f9',
  height: 70,
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderTopWidth: 1,
  borderTopColor: 'rgba(0,0,0,0.1)'
})

const IconContainer = glam.touchableOpacity({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

const IconText = glam.text({
  marginTop: 7,
  fontSize: 11
})

const RoundedIcon = glam(Icon)({
  borderRadius: 50,
  width: 32,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  backgroundColor: 'white',
  borderColor: 'rgba(0,0,0,0.3)'
})

const SelectedVersesModal = ({
  verses,
  isOpen,
  isSelectedVerseHighlighted,
  isSelectedVerseFavorited,
  toggleHighlight,
  toggleVerseFavorite,
  shareVerses
}: Props) => (
  <ModalBox
    isOpen={isOpen}
    animationDuration={200}
    position='bottom'
    backdrop={false}
    swipeToClose={false}
  >
    <IconContainer>
      <RoundedIcon
        name={isSelectedVerseFavorited ? 'close' : 'bookmark'}
        size={isSelectedVerseHighlighted ? 20 : 17}
        color='rgba(0,0,0,0.7)'
        onPress={() => toggleVerseFavorite(isSelectedVerseFavorited)}
      />
      <IconText>Favori</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name='content-paste'
        size={15}
        color='rgba(0,0,0,0.7)'
        onPress={() => Toast.show('Bientôt disponible')}
      />
      <IconText>Note</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name={isSelectedVerseHighlighted ? 'close' : 'border-color'}
        size={isSelectedVerseHighlighted ? 20 : 15}
        color='rgba(0,0,0,0.7)'
        onPress={() => toggleHighlight(isSelectedVerseHighlighted)}
      />
      <IconText>Surligner</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name='share'
        size={15}
        color='rgba(0,0,0,0.7)'
        onPress={() => shareVerses(verses)}
      />
      <IconText>Partager</IconText>
    </IconContainer>
  </ModalBox>
)

const getSelectedVerses = state => state.getIn(['bible', 'selectedVerses'])
const getHighlightedVerses = state => state.getIn(['user', 'bible', 'highlights'])
const getFavoritedVerses = state => state.getIn(['user', 'bible', 'favorites'])

const getHighlightInSelected = createSelector(
  [getSelectedVerses, getHighlightedVerses],
  (selected, highlighted) => Object.keys(selected.toJS()).find(s => highlighted.get(s))
)

const getFavoriteInSelected = createSelector(
  [getSelectedVerses, getFavoritedVerses],
  (selected, favorited) => Object.keys(selected.toJS()).find(s => favorited.get(s))
)

export default compose(
  connect(state => ({
    isOpen: !state.getIn(['bible', 'selectedVerses']).isEmpty(),
    isSelectedVerseHighlighted: !!getHighlightInSelected(state),
    isSelectedVerseFavorited: !!getFavoriteInSelected(state)
  }), UserActions),
  pure
)(SelectedVersesModal)
