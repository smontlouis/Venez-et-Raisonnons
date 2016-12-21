import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as AppActions from '../redux/modules/app'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  text: {
    marginLeft: 10,
    fontSize: 44,
    fontFamily: '$font.heading',
    color: '$color.tertiary',
  }
})

const LikeCount = ({ id, toggleLike, isActive, count }) => (
  <TouchableOpacity onPress={() => toggleLike(id)}>
    <View style={styles.container}>
      <Icon
        name="favorite"
        size={40}
        color={isActive ? '#C22839' : 'rgb(230,230,230)'}
      />
      <Text style={styles.text}>{count}</Text>
    </View>
  </TouchableOpacity>
)

LikeCount.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  toggleLike: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default connect(
  (state, ownProps) => ({
    isActive: !!state.app.getIn(['likes', ownProps.id]),
  }),
  AppActions,
)(LikeCount)
