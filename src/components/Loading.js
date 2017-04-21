import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator />
    <Text>Un petit instant svp...</Text>
  </View>
)


export default Loading
