import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pure, compose } from 'recompose'
import {
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: 'rgba(255, 188, 0, 0.1)',
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    color: '$color.secondary',
  },
  text: {
    color: '$color.secondary',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  }
})

const mailTo = (id, title) => {
  Linking.openURL(`mailto:venezetraisonnons@gmail.com?subject=Question ${id} - ${title}&body=Vos suggestions ici...`)
}

const Contribute = ({ id, title }) => (
  <TouchableOpacity
    onPress={() => mailTo(id, title)}
  >
    <View style={styles.container}>
      <Icon
        name="mode-edit"
        size={24}
        style={styles.icon}
      />
      <Text style={styles.text}>Une faute d'orthgraphe ? Un verset manquant ? N'hésitez pas à contribuer !</Text>
      <Icon
        name="chevron-right"
        size={24}
        style={styles.icon}
      />
    </View>
  </TouchableOpacity>
)


Contribute.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default pure(Contribute)
