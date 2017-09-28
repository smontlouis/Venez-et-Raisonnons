// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, withStateHandlers, pure } from 'recompose'
import { withNavigation } from 'react-navigation'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { Header } from '@components'
import { Spacer, Container, Box } from '@ui'
import * as UserActions from '@src/redux/modules/user'

import type { NavigationAction, NavigationState, NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type Props = {
  name: string,
  changeName: Function,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  onUserUpdateProfile: () => Object
}

const EditProfile = ({ name, changeName, navigation, onUserUpdateProfile }: Props) => (
  <Container>
    <Header
      title='Modifier mon profil'
    />
    <Box vPadding>
      <FormLabel>Nom</FormLabel>
      <FormInput
        underlineColorAndroid='#bdc6cf'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={changeName}
        value={name}
      />
      <Spacer size={20} />
      <Button
        title='Modifier'
        onPress={
          () => {
            onUserUpdateProfile({displayName: name})
            navigation.goBack()
          }
        }
        buttonStyle={{ backgroundColor: '#C22839', borderRadius: 5 }}
      />
    </Box>
  </Container>
)

const enhance = compose(
  connect(
    state => ({ name: state.get('user').get('displayName') }),
    { ...UserActions }
  ),
  withNavigation,
  withStateHandlers(
    ({ name }) => ({ name }),
    { changeName: ({ name }) => (value) => ({ name: value }) }
  ),
  pure
)

export default enhance(EditProfile)
