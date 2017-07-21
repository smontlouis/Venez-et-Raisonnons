// @flow
import React from 'react'
import Modal from 'react-native-modalbox'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import glam from 'glamorous-native'
import { Icon } from 'react-native-elements'
import { createSelector } from 'reselect'
import * as UserActions from '@src/redux/modules/user'

type Props = {
  isOpen: boolean,
  isSelectedVerseHighlighted: boolean,
  toggleHighlight: Function,
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

const SelectedVersesModal = ({ isOpen, isSelectedVerseHighlighted, toggleHighlight }: Props) => (
  <ModalBox
    isOpen={isOpen}
    animationDuration={200}
    position='bottom'
    backdrop={false}
    swipeToClose={false}
  >
    <IconContainer>
      <RoundedIcon
        name='bookmark-border'
        size={15}
        color='rgba(0,0,0,0.7)'
      />
      <IconText>Favori</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name='content-paste'
        size={15}
        color='rgba(0,0,0,0.7)'
      />
      <IconText>Note</IconText>
    </IconContainer>
    <IconContainer>
      <RoundedIcon
        name={isSelectedVerseHighlighted ? 'share' : 'border-color'}
        size={15}
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
      />
      <IconText>Partager</IconText>
    </IconContainer>
  </ModalBox>
)

const getSelectedVerses = state => state.getIn(['bible', 'selectedVerses'])
const getHighlightedVerses = state => state.getIn(['user', 'bible', 'highlights'])

const getHighlightInSelected = createSelector(
  [getSelectedVerses, getHighlightedVerses],
  (selected, highlighted) => Object.keys(selected.toJS()).find(s => highlighted.get(s))
)

export default compose(
  connect(state => ({
    isOpen: !state.getIn(['bible', 'selectedVerses']).isEmpty(),
    isSelectedVerseHighlighted: getHighlightInSelected(state)
  }), UserActions),
  pure
)(SelectedVersesModal)
