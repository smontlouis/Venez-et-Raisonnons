import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-simple-toast'
import { pure, compose } from 'recompose'
import { View, Text, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as AppActions from '@src/redux/modules/app'

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
  id: string,
  toggleMarkAsRead: Function,
  isActive?: boolean,
  hasIconOnly?: boolean
}

const renderIcon = (hasIconOnly, isActive) => {
  if (hasIconOnly) {
    return (
      <Icon
        name={isActive ? 'bookmark' : 'bookmark-border'}
        size={24}
        color='white'
      />
    )
  }

  return (
    <Icon
      name='check'
      size={24}
      color={isActive ? '#2ecc71' : 'rgb(230,230,230)'}
    />
  )
}

const MarkAsRead = ({ id, toggleMarkAsRead, isActive, hasIconOnly }: Props) => (
  <TouchableOpacity
    onPress={() => {
      Toast.show(isActive ? 'Marqué comme non lu' : 'Marqué comme lu')
      toggleMarkAsRead(id)
    }}
    activeOpacity={0.7}
  >
    <View style={styles.container}>
      {renderIcon(hasIconOnly, isActive)}
      {
        !hasIconOnly &&
        <Text style={styles.text}>Marquer comme Lu</Text>
      }
    </View>
  </TouchableOpacity>
)

export default compose(
  connect(
    (state, ownProps) => ({
      isActive: !!state.getIn(['app', 'hasBeenRead', ownProps.id])
    }),
    AppActions
  ),
  pure
)(MarkAsRead)
