// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { pure, compose } from 'recompose'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as BibleActions from '@src/redux/modules/bible'

const styles = EStyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '$color.grey'
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center'
  },
  text: {
    color: '$color.primary'
  }
})

type Props = {
  navigation: Object,
  validateSelected: Function
}

const SelectorButtons = ({ navigation, validateSelected }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text>ANNULER</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => { navigation.goBack(); validateSelected() }}>
      <Text style={styles.text}>SÉLECTIONNER</Text>
    </TouchableOpacity>
  </View>
)

export default compose(
  connect(
    null,
    BibleActions
  ),
  withNavigation,
  pure
)(SelectorButtons)
