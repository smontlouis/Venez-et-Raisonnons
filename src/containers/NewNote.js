// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, ScrollView } from 'react-native'
import { compose, pure, withStateHandlers } from 'recompose'
import { FormLabel, FormInput } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { Container, Box, FixedContainer, FixedButton, Spacer } from '@ui'
import { Header, SnackBar } from '@components'
import { formatVerseContent } from '@helpers'
import * as UserActions from '@modules/user'

import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  title: string,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  selectedIds: Object,
  note: string,
  changeNote: Function,
  saveNote: Function
}

const NewNote = ({ title, navigation, selectedIds, note, changeNote, saveNote }: Props) => (
  <Container>
    <StatusBar barStyle='dark-content' />
    <Header
      isLight
      title='Nouvelle note'
    />
    <ScrollView style={{ paddingBottom: 100, flex: 1 }}>
      <Box>
        <FormLabel>Contenu de la note - {title} </FormLabel>
        <Spacer />
        <FormInput
          onChangeText={changeNote}
          inputStyle={{ width: '100%', color: 'black' }}
          multiline
        />
      </Box>
    </ScrollView>
    <FixedContainer>
      <FixedButton onPress={() => navigation.goBack()}>
        ANNULER
      </FixedButton>
      <FixedButton
        onPress={() => { saveNote(note, selectedIds); navigation.goBack(); SnackBar.show('Note sauvegardée') }}
        primary
        disabled={!note.trim()}
      >
        SAUVEGARDER
      </FixedButton>
    </FixedContainer>
  </Container>
)

export default compose(
  pure,
  withNavigation,
  withStateHandlers(
    {
      note: ''
    },
    {
      changeNote: ({ note }) => (value) => ({ note: value })
    }
  ),
  connect(
    state => {
      const selectedIds = state.getIn(['bible', 'selectedVerses']).toJS()
      const verses = Object.keys(selectedIds)
        .sort()
        .map(v => {
          const [Livre, Chapitre, Verset] = v.split('-').map(Number)
          return { Livre, Chapitre, Verset, Texte: '' }
        })
      const { title } = formatVerseContent(verses)
      return {
        title,
        selectedIds
      }
    },
    { ...UserActions }
  )
)(NewNote)
