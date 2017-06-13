// @flow
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator />
    {/* <Text>Un petit instant svp...</Text> */}
  </View>
)

export default pure(Loading)
