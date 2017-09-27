// @flow
import React from 'react'
import Modal from 'react-native-modalbox'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import glam from 'glamorous-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { createSelector } from 'reselect'
import { SnackBar } from '@components'
import { withLogin } from '@helpers'
import * as UserActions from '@src/redux/modules/user'
import * as AppActions from '@src/redux/modules/app'

import { type Verse } from '@src/types'
import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  verses: Array<Verse>,
  isOpen: boolean,
  isSelectedVerseHighlighted: boolean,
  isSelectedVerseFavorited: boolean,
  toggleHighlight: Function,
  toggleVerseFavorite: Function,
  shareVerses: Function,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  isLogged: bool,
  showLoginModal: Function
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
  shareVerses,
  navigation,
  isLogged,
  showLoginModal
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
        onPress={
          () => toggleVerseFavorite(isSelectedVerseFavorited)
                  .then(() => SnackBar.show(!isSelectedVerseFavorited ? 'Marqué comme favori' : 'Supprimé des favoris'))
                  .catch((e) => console.log(e, 'Not connected'))
        }
      />
      <IconText>Favori</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name='content-paste'
        size={15}
        color='rgba(0,0,0,0.7)'
        onPress={() => {
          if (isLogged) {
            navigation.navigate('newNote')
          } else {
            showLoginModal()
          }
        }}
      />
      <IconText>Note</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name={isSelectedVerseHighlighted ? 'close' : 'border-color'}
        size={isSelectedVerseHighlighted ? 20 : 15}
        color='rgba(0,0,0,0.7)'
        onPress={
          () => toggleHighlight(isSelectedVerseHighlighted)
                  .then(() => SnackBar.show(!isSelectedVerseHighlighted ? 'Verset(s) surligné(s)' : 'Surlignage supprimé'))
                  .catch((e) => console.log(e, 'Not connected'))
        }
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
  pure,
  withLogin,
  connect(state => ({
    isOpen: !state.getIn(['bible', 'selectedVerses']).isEmpty(),
    isSelectedVerseHighlighted: !!getHighlightInSelected(state),
    isSelectedVerseFavorited: !!getFavoriteInSelected(state)
  }), { ...UserActions, ...AppActions }),
  withNavigation
)(SelectedVersesModal)
