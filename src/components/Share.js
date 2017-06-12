import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pure } from 'recompose'
import {
  View,
  Text,
  TouchableOpacity,
  Share as NativeShare,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    marginLeft: 10,
  }
})

const shareQuestion = () => {
  NativeShare.share({
    message: 'Such sharing! Wow',
    title: 'Best title ever!',
    url: 'http://codingmiles.com'
  })
  .then(result => console.log(result))
  .catch(err => console.log(err))
}

const Share = () => (
  <TouchableOpacity onPress={shareQuestion} >
    <View style={styles.container}>
      <Icon
        name="share"
        size={24}
        color="#000"
      />
      <Text style={styles.text}>Partager</Text>
    </View>
  </TouchableOpacity>
)


Share.propTypes = {

}

export default pure(Share)
