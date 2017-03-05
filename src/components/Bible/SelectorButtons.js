import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as BibleActions from '../../redux/modules/bible'

const styles = EStyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '$color.grey',
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  text: {
    color: '$color.primary'
  }
})

const SelectorButtons = ({ navigator, validateSelected }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={() => navigator.pop()}>
      <Text>ANNULER</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => { navigator.pop(); validateSelected() }}>
      <Text style={styles.text}>SÉLECTIONNER</Text>
    </TouchableOpacity>
  </View>
)


SelectorButtons.propTypes = {
  navigator: PropTypes.object.isRequired,
  validateSelected: PropTypes.func.isRequired,
}

export default connect(
  null,
  BibleActions,
)(withNavigation(SelectorButtons))
