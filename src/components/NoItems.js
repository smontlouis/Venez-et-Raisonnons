// @flow
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pure } from 'recompose'
import { Button } from 'react-native-elements'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '$color.primary',
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF0F4'
  },
  text: {
    fontSize: 20,
    color: '$color.tertiary'
  }
})

type Props = {
  buttonTitle?: string,
  buttonAction?: Function,
  icon: string,
  text: string
}

const NoItems = ({ icon, text, buttonTitle, buttonAction }: Props) => (
  <View style={styles.container}>
    <Icon
      name={icon}
      size={50}
      color={styles._text.color}
    />
    <Text style={styles.text}>{text}</Text>
    {
      buttonTitle &&
      <Button
        title='Réessayer'
        buttonStyle={styles.button}
        onPress={buttonAction}
      />
    }
  </View>
)

export default pure(NoItems)
