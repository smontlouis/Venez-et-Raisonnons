import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-elements'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '$color.primary',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF0F4',
  },
  text: {
    fontSize: 20,
    color: '$color.tertiary'
  }
})

const NoItems = ({ icon, text, buttonTitle, buttonAction }) => (
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
        title="Réessayer"
        buttonStyle={styles.button}
        onPress={buttonAction}
      />
    }
  </View>
)


NoItems.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NoItems
