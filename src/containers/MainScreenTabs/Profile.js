// @flow

import React from 'react'
import { compose, renderComponent, branch, pure } from 'recompose'
import { StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Header, Link, ScrollableHeader } from '@components'
import { Section, ProfileImage, ProfileItem, SendEmail } from '@components/Profile'
import { Container, Box, Text, Title, Spacer } from '@ui'
import { FireAuth, withLogin } from '@helpers'

import type {
  NavigationAction,
  NavigationState,
  NavigationScreenProp
} from 'react-navigation/src/TypeDefinition'

const UnloggedProfile = () => (
  <Container>
    <Header
      title='Profile'
      hasBackButton={false}
    />
    <Box>
      <Text>
        Profile pas connecté
      </Text>
      <Link route={'login'}>
        <Text sansSerif underline>
          Se connecter
        </Text>
      </Link>
    </Box>
  </Container>
)

type Props = {
  name?: string,
  picture?: string,
  email: string,
  emailVerified: boolean,
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
}

const Profile = ({
  name = 'Profile',
  picture,
  email,
  emailVerified,
  navigation
}: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <ScrollableHeader
      title={name}
      hasBackButton={false}
      header={(
        <Box center>
          <ProfileImage source={picture ? { uri: picture } : require('../../../static/images/bible.png')} />
          <Title secondaryFont reverse style={{ marginTop: 10 }}>{name}</Title>
          <Text sansSerif style={{ marginBottom: 30, color: 'rgba(255,255,255, 0.5)' }}>{email}</Text>
        </Box>
      )}
    >
      <ScrollView>
        {
          !emailVerified &&
          <SendEmail />
        }
        <Section title='Questions' />
        <Box row>
          <ProfileItem
            icon='bookmark'
            name='Favoris'
            onPress={() => navigation.navigate('favorites')}
          />
          <ProfileItem
            icon='playlist-add-check'
            name='Lues'
            onPress={() => navigation.navigate('read')}
          />
          <ProfileItem
            icon='favorite'
            name='Aimées'
            onPress={() => navigation.navigate('liked')}
          />
        </Box>
        <Section title='Bible' />
        <Box row>
          <ProfileItem
            icon='ios-bookmarks'
            type='ionicon'
            name='Favoris'
            onPress={() => console.log('coucou')}
          />
          <ProfileItem
            icon='event-note'
            name='Notes'
            onPress={() => console.log('coucou')}
          />
          <ProfileItem
            icon='border-color'
            name='Surbrillances'
            onPress={() => console.log('coucou')}
          />
        </Box>
        <Section title='Paramètres' />
        <Box>
          <Box row>
            <ProfileItem
              icon='info'
              name='À propos'
              onPress={() => console.log('coucou')}
            />
            <ProfileItem
              icon='edit'
              name='Modifier'
              onPress={() => console.log('coucou')}
            />
            <ProfileItem
              icon='power-settings-new'
              name='Déconnexion'
              onPress={() => FireAuth.logout()}
            />
          </Box>
        </Box>
        <Spacer size={50} />
      </ScrollView>
    </ScrollableHeader>
  </Container>
)

const enhance = compose(
  connect(
    (state) => ({
      name: state.getIn(['user', 'displayName']),
      email: state.getIn(['user', 'email']),
      picture: state.getIn(['user', 'photoURL']),
      emailVerified: state.getIn(['user', 'emailVerified'])
    })
  ),
  withLogin,
  pure,
  branch(
    ({ isLogged }) => !isLogged,
    renderComponent(UnloggedProfile)
  )
)

export default enhance(Profile)
