// @flow

import React from 'react'
import { pure, compose } from 'recompose'
import Modal from 'react-native-modalbox'
import glam from 'glamorous-native'
import { connect } from 'react-redux'
import { Text } from '@ui'
import * as AppActions from '@src/redux/modules/app'

const ModalBox = glam(Modal, { forwardProps: ['position', 'isOpen'] })({
  backgroundColor: '#f9f9f9',
  height: 70,
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderTopWidth: 1,
  borderTopColor: 'rgba(0,0,0,0.1)'
})

const LoginModal = ({ isOpen }) => (
  <ModalBox
    isOpen={isOpen}
    animationDuration={200}
    position='bottom'
  >
    <Text>Coucou</Text>
  </ModalBox>
)

export default compose(
  pure,
  connect(state => ({
    isOpen: !state.getIn(['app', 'isLoginModalOpened'])
  }), { ...AppActions })
)(LoginModal)
