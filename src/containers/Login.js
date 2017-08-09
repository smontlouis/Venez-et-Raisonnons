import React from 'react'
import { compose, pure } from 'recompose'
import { StatusBar, ScrollView } from 'react-native'
import { ProfileImage } from '@components/Profile'
import { ScrollableHeader, LoginContainer } from '@components'
import { Container, Box, Text, Title } from '@ui'

const Login = () => (
  <Container>
    <StatusBar barStyle='light-content' />
    <ScrollableHeader
      title='Inscrivez-vous'
      hasBackButton={false}
      header={(
        <Box center>
          <ProfileImage source={require('../../static/images/anonymous-user.jpg')} />
          <Title secondaryFont reverse style={{ marginTop: 10 }}>Mon profil</Title>
          <Text sansSerif style={{ marginBottom: 30, color: 'rgba(255,255,255, 0.5)' }} />
        </Box>
      )}
    >
      <ScrollView>
        <LoginContainer />
      </ScrollView>
    </ScrollableHeader>
  </Container>
)

export default compose(
  pure
)(Login)
