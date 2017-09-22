// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, ScrollView } from 'react-native'
import { compose, pure, withStateHandlers } from 'recompose'
import { FormLabel, FormInput } from 'react-native-elements'
import glamorous from 'glamorous-native'
import { withNavigation } from 'react-navigation'
import { Container, Box, FixedContainer, Text } from '@ui'
import { Header } from '@components'
import { formatVerseContent } from '@helpers'
import UserActions from '@modules/user'

import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  title: string,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  selectedIds: Object,
  note: string,
  changeNote: Function,
  saveNote: Function
}

const BottomButton = glamorous.touchableOpacity({
  paddingLeft: 15,
  paddingRight: 15,
  justifyContent: 'center'
})

const Favorites = ({ title, navigation, selectedIds, note, changeNote, saveNote }: Props) => (
  <Container>
    <StatusBar barStyle='dark-content' />
    <Header
      isLight
      title='Nouvelle note'
    />
    <ScrollView style={{ paddingBottom: 100, flex: 1 }}>
      <Box>
        <FormLabel>Contenu de la note - {title} </FormLabel>
        <FormInput
          onChangeText={changeNote}
          multiline
        />
      </Box>
    </ScrollView>
    <FixedContainer>
      <BottomButton onPress={() => navigation.goBack()}>
        <Text sansSerif medium>ANNULER</Text>
      </BottomButton>
      <BottomButton onPress={() => saveNote(note, selectedIds)}>
        <Text sansSerif medium>SÉLECTIONNER</Text>
      </BottomButton>
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
  connect(state => {
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
  }, { ...UserActions })
)(Favorites)
