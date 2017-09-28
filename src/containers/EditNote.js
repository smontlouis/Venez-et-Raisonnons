// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, ScrollView } from 'react-native'
import { compose, pure, withStateHandlers } from 'recompose'
import { FormLabel, FormInput } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Container, Box, FixedContainer, FixedButton, Spacer } from '@ui'
import { Header, SnackBar } from '@components'
import * as UserActions from '@modules/user'

import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  // date: number,
  // title: string,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  note: string,
  changeNote: Function,
  editNote: Function
}

const EditNote = ({ navigation: { state: { params: { title, date } } }, navigation, note, changeNote, editNote }: Props) => (
  <Container>
    <StatusBar barStyle='dark-content' />
    <Header
      isLight
      title='Modifier la note'
    />
    <ScrollView style={{ paddingBottom: 100, flex: 1 }}>
      <Box>
        <FormLabel>Contenu de la note - {title} </FormLabel>
        <Spacer />
        <FormInput
          underlineColorAndroid='#bdc6cf'
          onChangeText={changeNote}
          inputStyle={{ width: '100%', color: 'black' }}
          value={note}
          multiline
        />
      </Box>
    </ScrollView>
    <FixedContainer>
      <FixedButton onPress={() => { navigation.goBack() }}>
        ANNULER
      </FixedButton>
      <FixedButton
        onPress={() => { editNote(date.toString(), note); navigation.goBack(); SnackBar.show('Note modifiée') }}
        primary
        disabled={!note.trim()}
      >
        SAUVEGARDER
      </FixedButton>
    </FixedContainer>
    <KeyboardSpacer />
  </Container>
)

export default compose(
  pure,
  withNavigation,
  withStateHandlers(
    ({ navigation: { state: { params: { text } } } }) => ({ note: text }),
    { changeNote: ({ note }) => (value) => ({ note: value }) }
  ),
  connect(
    null,
    { ...UserActions }
  )
)(EditNote)
