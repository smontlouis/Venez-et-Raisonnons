import React from 'react'
import { compose, renderComponent, branch } from 'recompose'
import { StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Header, Link, ScrollableHeader } from '@components'
import { Section, ProfileImage, ProfileItem } from '@components/Profile'
import { Container, Box, Text, Title, Spacer } from '@ui'
import { FireAuth, withLogin } from '@helpers'

const UnloggedProfile = () => (
  <Container>
    <Header
      title='Profile'
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
  isLogged: bool,
  name?: string,
  picture?: string,
  email: string,
  emailVerified: boolean
}

const Profile = ({ isLogged, name = 'Profile', picture, email, emailVerified }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <ScrollableHeader
      title={name}
      header={(
        <Box center>
          <ProfileImage source={picture ? { uri: picture } : require('../../static/images/bible.png')} />
          <Title secondaryFont reverse style={{ marginTop: 10 }}>{name}</Title>
          <Text sansSerif style={{ marginBottom: 30, color: 'rgba(255,255,255, 0.5)' }}>{email}</Text>
          {
            !emailVerified &&
            <Text>
              Vous n'avez pas encore vérifié votre compte !
            </Text>
          }
        </Box>
      )}
    >
      <ScrollView>
        <Section title='Questions' />
        <Box row>
          <ProfileItem
            icon='bookmark'
            name='Favoris'
            onPress={() => console.log('coucou')}
          />
          <ProfileItem
            icon='playlist-add-check'
            name='Lues'
            onPress={() => console.log('coucou')}
          />
          <ProfileItem
            icon='favorite'
            name='Aimées'
            onPress={() => console.log('coucou')}
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

export default compose(
  withLogin,
  branch(
    ({ isLogged }) => !isLogged,
    renderComponent(UnloggedProfile)
  ),
  connect(
    (state) => ({
      name: state.getIn(['user', 'displayName']),
      email: state.getIn(['user', 'email']),
      picture: state.getIn(['user', 'photoURL']),
      emailVerified: state.getIn(['user', 'emailVerified'])
    })
  )
)(Profile)
