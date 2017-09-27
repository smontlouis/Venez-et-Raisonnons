// @flow
import React from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { Title, Text } from '@ui'

const styles = EStyleSheet.create({
  titleBorder: {
    marginTop: 20,
    marginBottom: 30,
    width: 35,
    height: 3,
    backgroundColor: '$color.primary'
  }
})

Animatable.initializeRegistryWithDefinitions({
  stretch: {
    from: {
      width: 35
    },
    to: {
      width: 50
    }
  }
})

type Props = {
  title: string,
  subtitle?: string
}

const HeaderList = ({ title, subtitle, isLoading }: Props) => (
  <View>
    <Title marginTop={20}>{title}</Title>
    {
      subtitle &&
      <Text tertiaryFont small tertiary>{subtitle}</Text>
    }
    <Animatable.View
      animation={isLoading ? 'stretch' : null}
      easing='ease-out'
      iterationCount='infinite'
      direction='alternate'
      duration={500}
      style={styles.titleBorder}
    />
  </View>
)

export default compose(
  connect(state => ({
    isLoading: state.getIn(['app', 'isLoading'])
  })),
  pure
)(HeaderList)
