// @flow
import React, { PropTypes, Component } from 'react'
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

@pure
class Search extends Component {
  constructor (props) {
    super(props)

    this.onChangeText = ::this.onChangeText
    this.onClear = ::this.onClear
  }

  state = {
    hasText: false
  }

  onChangeText (value) {
    if (value) this.setState({ hasText: true })
    else this.setState({ hasText: false })

    this.props.onChangeText(value)
  }

  onClear () {
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
          ref={c => this.input = c}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.onChangeText}
          placeholderTextColor={isLight ? 'black' : 'white'}
          underlineColorAndroid='transparent'
          style={[
            styles.input,
            noIcon && { paddingLeft: 9 },
            round && { borderRadius: 15 },
            isLight && { backgroundColor: 'white', color: 'black' },
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

Search.propTypes = {
  icon: PropTypes.object,
  isLight: PropTypes.bool,
  noIcon: PropTypes.bool,
  containerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  onChangeText: PropTypes.func.isRequired,
  round: PropTypes.bool,
  textInputRef: PropTypes.string,
  containerRef: PropTypes.string
}

Search.defaultProps = {
  noIcon: false,
  round: false,
  icon: {}
}

export default Search
