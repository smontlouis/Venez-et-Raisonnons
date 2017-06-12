import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pure, compose } from 'recompose'
import { View, Text, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as AppActions from '@src/redux/modules/app'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30
  },
  text: {
    marginLeft: 10,
    fontSize: 44,
    fontFamily: '$font.heading',
    color: '$color.tertiary'
  }
})

type Props = {
  id: string,
  isActive?: bool,
  toggleLike: Function,
  count: number
}

const LikeCount = ({ id, toggleLike, isActive, count }: Props) => (
  <TouchableOpacity onPress={() => toggleLike(id)}>
    <View style={styles.container}>
      <Icon
        name='favorite'
        size={40}
        color={isActive ? '#C22839' : 'rgb(230,230,230)'}
      />
      <Text style={styles.text}>{count}</Text>
    </View>
  </TouchableOpacity>
)

export default compose(
  connect(
    (state, ownProps) => ({
      isActive: !!state.getIn(['app', 'likes', ownProps.id])
    }),
    AppActions
  ),
  pure
)(LikeCount)
