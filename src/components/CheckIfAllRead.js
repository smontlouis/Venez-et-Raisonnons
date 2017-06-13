// @flow
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pure, compose } from 'recompose'

import {
  View,
  Text
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    marginLeft: 10
  }
})

type Props = {
  markedAsRead: boolean
}

const CheckIfAllRead = ({ markedAsRead }: Props) => (
  <View style={styles.container}>
    <Icon
      name='check'
      size={24}
      color={markedAsRead ? '#2ecc71' : 'rgb(230,230,230)'}
    />
    <Text style={styles.text}>Étude complétée</Text>
  </View>
)

export default compose(
  pure
)(CheckIfAllRead)
