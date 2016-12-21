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
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    marginLeft: 10,
  }
})

const AddToFavorites = ({ id, toggleFavorite, isActive }) => (
  <TouchableOpacity onPress={() => toggleFavorite(id)}>
    <View style={styles.container}>
      <Icon
        name="bookmark"
        size={24}
        color={isActive ? '#FFBC00' : 'rgb(230,230,230)'}
      />
      <Text style={styles.text}>Ajouter aux favoris</Text>
    </View>
  </TouchableOpacity>
)

AddToFavorites.propTypes = {
  id: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

export default connect(
  (state, ownProps) => ({
    isActive: !!state.app.getIn(['favorites', ownProps.id])
  }),
  AppActions,
)(AddToFavorites)
