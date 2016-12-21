import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
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

const NoItems = ({ icon, text }) => (
  <View style={styles.container}>
    <Icon
      name={icon}
      size={50}
      color={styles._text.color}
    />
    <Text style={styles.text}>{text}</Text>
  </View>
)


NoItems.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NoItems
