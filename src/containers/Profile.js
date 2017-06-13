import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  Text,
  View
} from 'react-native'
// import * as FavoritesActions from '@src/redux/modules/favorites'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

const Profile = () =>
  <View style={styles.container}>
    <Text>
      PROFILE
    </Text>
  </View>

export default connect(
  state => ({

  })
  // FavoritesActions,
)(Profile)
