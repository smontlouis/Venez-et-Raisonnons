import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Back } from '../components'

import combineStyles from '../helpers/combineStyles'


const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primaryDarken',
    height: 64,
    paddingTop: 18,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerTransparent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '100%',
    top: 0,
    left: 0,
  },
  back: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 32,
    width: 32,
    marginLeft: 10,
  },
  indicator: {
    marginRight: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 32,
    width: 32,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white',
  }
})

const Header = ({ title, hasBackButton = true, isTransparent, isLoading }) => {
  const ContainerStyles = combineStyles({
    container: true,
    containerTransparent: isTransparent,
  }, styles)

  return (
    <View
      style={ContainerStyles}
    >
      {
        title &&
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
          </View>
      }
      {
        hasBackButton &&
        <Back
          style={styles.back}
          underlayColor="transparent"
        >
          <Icon name="chevron-left" size={20} color="white" />
        </Back>
      }
      {
        isLoading &&
        <View style={styles.indicator}>
          <ActivityIndicator color="white" />
        </View>
      }
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasBackButton: PropTypes.bool,
  isTransparent: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    isLoading: state.app.get('isLoading'),
  })
)(Header)
