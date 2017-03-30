import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-simple-toast'

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as AppActions from '@src/redux/modules/app'

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

const renderIcon = (hasIconOnly, isActive) => {
  if (hasIconOnly) {
    return (
      <Icon
        name={isActive ? 'bookmark' : 'bookmark-border'}
        size={24}
        color="white"
      />
    )
  }

  return (
    <Icon
      name="bookmark"
      size={24}
      color={isActive ? '#FFBC00' : 'rgb(230,230,230)'}
    />
  )
}

const AddToFavorites = ({ id, toggleFavorite, isActive, hasIconOnly }) => (
  <TouchableOpacity
    onPress={() => {
      Toast.show(isActive ? 'Supprimé des favoris' : 'Ajouté aux favoris')
      toggleFavorite(id)
    }}
    activeOpacity={0.7}
  >
    <View style={styles.container}>
      {renderIcon(hasIconOnly, isActive)}
      {
        !hasIconOnly &&
        <Text style={styles.text}>Ajouter aux favoris</Text>
      }
    </View>
  </TouchableOpacity>
)

AddToFavorites.propTypes = {
  id: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  hasIconOnly: PropTypes.bool,
}

export default connect(
  (state, ownProps) => ({
    isActive: !!state.getIn(['app', 'favorites', ownProps.id])
  }),
  AppActions,
)(AddToFavorites)
