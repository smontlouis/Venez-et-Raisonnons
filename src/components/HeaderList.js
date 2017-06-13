// @flow
import React from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'
import { Title, Text } from '@src/styled'

const styles = EStyleSheet.create({
  titleBorder: {
    marginTop: 20,
    marginBottom: 30,
    width: 35,
    height: 3,
    backgroundColor: '$color.primary'
  }
})

type Props = {
  title: string,
  subtitle?: string
}

const HeaderList = ({ title, subtitle }: Props) => (
  <View>
    <Title marginTop={20}>{title}</Title>
    {
      subtitle &&
      <Text tertiaryFont small tertiary>{subtitle}</Text>
    }
    <View style={styles.titleBorder} />
  </View>
)

export default pure(HeaderList)
