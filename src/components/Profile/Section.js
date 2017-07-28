import React from 'react'
import glam from 'glamorous-native'
import { Spacer } from '@ui'

const Container = glam.view({
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 30,
  paddingBottom: 30
})

const Title = glam.text((_, theme) => ({
  fontFamily: theme.fonts.secondaryFont,
  color: theme.colors.grey,
  fontSize: 20
}))

const Underline = glam.view((_, theme) => ({
  height: 2,
  backgroundColor: theme.colors.grey,
  width: 50
}))

const Section = ({title}) => (
  <Container>
    <Title>{title.toUpperCase()}</Title>
    <Spacer size={10} />
    <Underline />
  </Container>
)

export default Section
