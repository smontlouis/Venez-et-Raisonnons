// @flow
import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Back } from '@src/components'
import { combineStyles } from '@src/helpers'
import { pure, compose } from 'recompose'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primaryDarken',
    height: '$header.height',
    paddingTop: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  containerLight: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '$color.grey'
  },
  containerTransparent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '100%',
    top: 0,
    left: 0
  },
  back: {
    position: 'absolute',
    bottom: '$header.icon',
    left: 0,
    height: 32,
    width: 32,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    marginRight: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 32,
    width: 32
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white'
  },
  titleLight: {
    color: 'black'
  }
})

type Props = {
  title: string,
  hasBackButton?: bool,
  isTransparent?: bool,
  isLight?: bool,
  isModal?: bool,
  isLoading: bool,
  onRightIconPress?: Function,
  rightIconName?: string,
}

const Header = ({ title, hasBackButton = true, isTransparent, isLight, isLoading, isModal, onRightIconPress, rightIconName }: Props) => {
  const ContainerStyles = combineStyles({
    container: true,
    containerTransparent: isTransparent,
    containerLight: isLight
  }, styles)

  const TextStyles = combineStyles({
    title: true,
    titleLight: isLight
  }, styles)

  return (
    <View
      style={ContainerStyles}
    >
      {
        title &&
          <View style={styles.titleContainer}>
            <Text style={TextStyles}>{title.toUpperCase()}</Text>
          </View>
      }
      {
        hasBackButton &&
        <Back
          style={styles.back}
          underlayColor='transparent'
        >
          <Icon name={isModal ? 'close' : 'chevron-left'} size={isModal ? 20 : 28} color={isLight ? 'black' : 'white'} />
        </Back>
      }
      {
        rightIconName &&
        <TouchableOpacity style={styles.indicator} onPress={onRightIconPress}>
          <Icon name={rightIconName} size={24} color={isLight ? 'black' : 'white'} />
        </TouchableOpacity>
      }
    </View>
  )
}

export default compose(
  pure,
  connect(
    state => ({
      isLoading: state.get('app').get('isLoading')
    })
  )
)(Header)
