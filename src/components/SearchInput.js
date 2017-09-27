// @flow
import React, { Component } from 'react'
import { View, TextInput, Platform, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pure } from 'recompose'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: (Platform.OS === 'ios') ? 7 : 5
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 16,
    top: 13
  },
  close: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 16,
    top: 13
  },
  input: {
    paddingLeft: 35,
    paddingRight: 19,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    flex: 1,
    borderBottomWidth: 0
  }
})

type Props = {
  icon?: Object,
  isLight?: boolean,
  noIcon?: boolean,
  containerStyle?: Array<*> | Object,
  inputStyle?: Array<*> | Object,
  onChangeText: Function,
  round?: boolean
}

@pure
class SearchInput extends Component {
  input: Object
  props: Props

  static defaultProps = {
    noIcon: false,
    round: false,
    icon: {}
  }

  state = {
    hasText: false
  }

  onChangeText = (value: string) => {
    if (value) this.setState({ hasText: true })
    else this.setState({ hasText: false })

    this.props.onChangeText(value)
  }

  onClear = () => {
    this.props.onChangeText('')
    this.setState({ hasText: false })
    this.input.clear()
  }

  render () {
    const {
    containerStyle,
    inputStyle,
    icon,
    noIcon,
    round,
    isLight,
    ...props
  } = this.props
    return (
      <View
        style={[
          styles.container,
          containerStyle && containerStyle
        ]}
      >
        <TextInput
          {...props}
          ref={c => { this.input = c }}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.onChangeText}
          placeholderTextColor={isLight ? 'black' : 'white'}
          underlineColorAndroid='transparent'
          style={[
            styles.input,
            noIcon && { paddingLeft: 9 },
            round && { borderRadius: 15 },
            isLight && { backgroundColor: 'rgba(0,0,0,0.05)', color: 'black' },
            inputStyle && inputStyle
          ]}
        />
        {
          !noIcon && (
            <Icon
              size={20}
              style={[
                styles.icon,
                icon.style && icon.style
              ]}
              name={icon.name || 'search'}
              color={isLight ? 'black' : 'white'}
            />
          )
        }
        {
          this.state.hasText && (
            <TouchableOpacity
              onPress={this.onClear}
              style={styles.close}
            >
              <Icon
                size={20}
                name={'close'}
                color={isLight ? 'black' : 'white'}
              />
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

export default SearchInput
