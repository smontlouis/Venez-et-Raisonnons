// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { compose, pure } from 'recompose'
import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Box, Text, Title, Spacer, FixedContainer, FixedButton } from '@ui'
import { Header, SnackBar } from '@components'
import { truncate } from '@src/helpers'
import * as UserActions from '@modules/user'

const Note = ({ text, removeNote, navigation, navigation: { state: { params: { date, formattedDate, title, content, verseParams } } } }) => (
  <Container>
    <StatusBar barStyle='dark-content' />
    <Header
      isLight
      title={title}
    />
    <ScrollView style={{ paddingBottom: 100, flex: 1 }}>
      <Box paddingAll>
        <Box>
          <Title medium secondaryFont>Contenu de la note - {title} </Title>
          <Text tertiary small>Il y a {formattedDate}</Text>
        </Box>
        <Box padding>
          <Text medium>{text}</Text>
        </Box>
        <Spacer />
        <TouchableOpacity onPress={() => navigation.navigate('bible', verseParams)}>
          <Box paddingAll grey row center>
            <Text flex medium>{truncate(content, 100)}</Text>
            <Icon name='md-arrow-round-forward' size={18} color='#C22839' />
          </Box>
        </TouchableOpacity>
      </Box>
    </ScrollView>
    <FixedContainer>
      <FixedButton onPress={() => {
        Alert.alert(
          'Supprimer la note',
          'Êtes-vous sur de vouloir supprimer cette note ?',
          [
            { text: 'Annuler', onPress: () => {} },
            {
              text: 'Supprimer',
              onPress: () => {
                navigation.goBack()
                removeNote(date.toString())
                SnackBar.show('Note supprimée')
              },
              style: 'destructive'
            }
          ]
      )
      }}>
        SUPPRIMER
      </FixedButton>
      <FixedButton onPress={() => navigation.navigate('editNote', { title, date, text })}>
        MODIFIER
      </FixedButton>
    </FixedContainer>
  </Container>
)

export default compose(
  pure,
  connect((state, props) => {
    const text = state.getIn(['user', 'bible', 'notes', props.navigation.state.params.date.toString(), 'text'])
    return {
      text
    }
  }, { ...UserActions })
)(Note)
