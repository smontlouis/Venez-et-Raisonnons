import React, { PropTypes, Component } from 'react'
import { View, TextInput, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: (Platform.OS === 'ios') ? 7 : 5,
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 16,
    top: 13,
  },
  input: {
    paddingLeft: 35,
    paddingRight: 19,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)',
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    flex: 1,
    borderBottomWidth: 0,
  }
})


class Search extends Component {
  focus() {
    const ref = this.props.textInputRef
    ref.focus()
  }
  render() {
    const {
    containerStyle,
    inputStyle,
    icon,
    noIcon,
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
          containerStyle && containerStyle
        ]}
      >
        <TextInput
          ref={textInputRef}
          {...props}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={[
            styles.input,
            noIcon && { paddingLeft: 9 },
            round && { borderRadius: 15 },
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
              color="white"
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
  containerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  round: PropTypes.bool,
  textInputRef: PropTypes.string,
  containerRef: PropTypes.string,
}

Search.defaultProps = {
  noIcon: false,
  round: false,
  icon: {}
}

export default Search
