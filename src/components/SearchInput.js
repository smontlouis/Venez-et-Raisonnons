import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, TextInput, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const colors = {
  primary: '#9E9E9E',
  primary1: '#4d86f7',
  primary2: '#6296f9',
  secondary: '#8F0CE8',
  secondary2: '#00B233',
  secondary3: '#00FF48',
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  dkGreyBg: '#232323',
  greyOutline: '#cbd2d9',
  searchBg: '#303337',
  disabled: '#dadee0',
  white: '#ffffff',
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderTopColor: '#000',
    backgroundColor: colors.grey0
  },
  containerLight: {
    backgroundColor: colors.grey5,
    borderTopColor: '#e1e1e1',
    borderBottomColor: '#e1e1e1'
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 16,
    top: 15.5,
    ...Platform.select({
      android: {
        top: 20
      }
    })
  },
  input: {
    paddingLeft: 26,
    paddingRight: 19,
    margin: 8,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: colors.searchBg,
    fontSize: 14,
    color: colors.grey3,
    height: 40,
    ...Platform.select({
      ios: {
        height: 30
      },
      android: {
        borderWidth: 0
      }
    })
  },
  inputLight: {
    backgroundColor: colors.grey4
  }
})


class Search extends Component {
  focus() {
    const ref = this.props.textInputRef
    this.refs[ref].focus()
  }
  render() {
    const {
    containerStyle,
    inputStyle,
    icon,
    noIcon,
    lightTheme,
    round,
    /* inherited props */
    textInputRef,
    containerRef,
    ...props,
  } = this.props
    return (
      <View
        ref={containerRef}
        style={[
          styles.container,
          lightTheme && styles.containerLight,
          containerStyle && containerStyle
        ]}>
        <TextInput
          ref={textInputRef}
          {...props}
          style={[
            styles.input,
            lightTheme && styles.inputLight,
            noIcon && { paddingLeft: 9 },
            round && { borderRadius: 15 },
            inputStyle && inputStyle
          ]}
        />
        {
          !noIcon && (
            <Icon
              size={16}
              style={[
                styles.icon,
                icon.style && icon.style
              ]}
              name={icon.name || 'search'}
              color={icon.color || colors.grey3}
            />
          )
        }
      </View>
    )
  }
}

Search.propTypes = {
  icon: PropTypes.object,
  noIcon: PropTypes.bool,
  lightTheme: PropTypes.bool,
  containerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  round: PropTypes.bool
}

Search.defaultProps = {
  placeholderTextColor: colors.grey3,
  lightTheme: false,
  noIcon: false,
  round: false,
  icon: {}
}

export default Search
