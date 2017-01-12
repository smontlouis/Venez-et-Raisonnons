import React from 'react'
import {
  View,
  ActivityIndicator,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  },
})

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator style={styles.centered} />
  </View>
)


export default Loading
