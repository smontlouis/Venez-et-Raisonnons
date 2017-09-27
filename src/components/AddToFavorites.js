// @flow
import React from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SnackBar } from '@components'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as UserActions from '@src/redux/modules/user'

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
  toggleFavorite: Function,
  isActive: boolean,
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
      name='bookmark'
      size={24}
      color={isActive ? '#FFBC00' : 'rgb(230,230,230)'}
    />
  )
}

const AddToFavorites = ({ id, toggleFavorite, isActive, hasIconOnly }: Props) => (
  <TouchableOpacity
    onPress={() => {
      toggleFavorite(id)
        .then(() => SnackBar.show(isActive ? 'Supprimé des favoris' : 'Ajouté aux favoris'))
        .catch(() => console.log('Not connected'))
    }}
    activeOpacity={0.7}
  >
    <View style={styles.container}>
      {renderIcon(hasIconOnly, isActive)}
      {
        !hasIconOnly &&
        <Text style={styles.text}>Favori</Text>
      }
    </View>
  </TouchableOpacity>
)

export default compose(
  pure,
  connect(
    (state, ownProps) => ({
      isActive: !!state.getIn(['user', 'questions', 'favorites', ownProps.id])
    }),
    { ...UserActions }
  ),
)(AddToFavorites)
