import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
  TouchableOpacity,
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

const Share = () => (
  <TouchableOpacity onPress={() => {}} >
    <View style={styles.container}>
      <Icon
        name="share"
        size={24}
        color="#FFBC00"
      />
      <Text style={styles.text}>Partager</Text>
    </View>
  </TouchableOpacity>
)


Share.propTypes = {

}

export default Share
