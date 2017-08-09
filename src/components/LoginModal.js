// @flow

import React from 'react'
import { StatusBar } from 'react-native'
import { pure, compose } from 'recompose'
import Modal from 'react-native-modalbox'
import glam, { TouchableOpacity } from 'glamorous-native'
import { connect } from 'react-redux'
import { LoginContainer } from '@components'
import { Text, Container, Box } from '@ui'
import * as AppActions from '@src/redux/modules/app'

const ModalBox = glam(Modal, { forwardProps: ['position', 'isOpen'] })({
  backgroundColor: '#f9f9f9',
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderTopWidth: 1,
  borderTopColor: 'rgba(0,0,0,0.1)'
})

const LoginModal = ({ isOpen, hideLoginModal }) => (
  <ModalBox
    isOpen={isOpen}
    animationDuration={200}
    swipeToClose={false}
    backdropPressToClose={false}
    position='bottom'
  >
    <StatusBar barStyle='dark-content' />
    <Container>
      <TouchableOpacity
        marginTop={10}
        padding={15}
        alignItems='flex-end'
        onPress={() => hideLoginModal()}
      >
        <Text style={{ fontSize: 22 }}>✕</Text>
      </TouchableOpacity>
      <Box style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Text sansSerif>
          Connectez-vous pour profiter de toutes les fonctionnalités !
        </Text>
      </Box>
      <LoginContainer />
    </Container>
  </ModalBox>
)

export default compose(
  pure,
  connect(state => ({
    isOpen: !!state.getIn(['app', 'isLoginModalOpened'])
  }), { ...AppActions })
)(LoginModal)
