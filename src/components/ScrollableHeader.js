import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'
import { Animated, Platform, StatusBar, View } from 'react-native'
import { truncate } from '@src/helpers'
import { Back } from '@src/components'

const getStyles = (h) => {
  const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 73
  const HEADER_MAX_HEIGHT = h + HEADER_MIN_HEIGHT
  const NEGATIVE_DISTANCE = -HEADER_MAX_HEIGHT
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

  const styles = EStyleSheet.create({
    fill: {
      flex: 1
    },
    content: {
      flex: 1
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '$color.primary',
      overflow: 'hidden'
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: null,
      height: HEADER_MAX_HEIGHT
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: HEADER_MAX_HEIGHT,
      resizeMode: 'cover'
    },
    stickyContent: {
      position: 'absolute',
      top: HEADER_MIN_HEIGHT,
      // bottom: 0,
      // height: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      left: 0,
      right: 0
    },
    bar: {
      marginTop: 20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    back: {
      position: 'absolute',
      height: (Platform.OS === 'ios') ? 44 : 53,
      left: 0,
      top: 0,
      width: 42,
      paddingLeft: 10,
      justifyContent: 'center'
    },
    rightComponent: {
      position: 'absolute',
      width: 42,
      // height: 44,
      right: 0,
      top: (Platform.OS === 'ios') ? 10 : 15
    },
    title: {
      color: 'white',
      fontFamily: '$font.heading',
      fontSize: 20,
      backgroundColor: 'transparent'
    },
    scrollViewContent: {
      paddingTop: HEADER_MAX_HEIGHT
    },
    row: {
      height: 40,
      margin: 16,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return {
    styles,
    NEGATIVE_DISTANCE,
    HEADER_SCROLL_DISTANCE,
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT
  }
}

@pure
export default class ScrollableHeader extends Component {
  static propTypes = {
    headerStyle: PropTypes.object,
    hasBackButton: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    header: PropTypes.element,
    image: PropTypes.string,
    rightComponent: PropTypes.element,
    onScrollViewEnd: PropTypes.func,
    isHome: PropTypes.bool,
    isStudies: PropTypes.bool
  }

  constructor (props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(0),
      headerMaxHeight: 150
    }

    this.getHeaderSize = ::this.getHeaderSize
    this.detectScrollViewEnd = ::this.detectScrollViewEnd
  }

  state = { hasReachedEnd: false }

  getHeaderSize (event) {
    this.setState({ headerMaxHeight: event.nativeEvent.layout.height })
  }

  detectScrollViewEnd ({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) {
    const paddingToBottom = 120
    const hasReachedEnd = layoutMeasurement.height + contentOffset.y >=
                            contentSize.height - paddingToBottom

    if (hasReachedEnd && !this.state.hasReachedEnd) {
      this.setState({ hasReachedEnd: true })
      this.props.onScrollViewEnd && this.props.onScrollViewEnd()
    }
  }

  render () {
    const {
      headerStyle,
      children,
      title,
      header,
      image,
      rightComponent,
      hasBackButton = true,
      isHome,
      isStudies
    } = this.props
    const {
      styles,
      NEGATIVE_DISTANCE,
      HEADER_SCROLL_DISTANCE,
      HEADER_MAX_HEIGHT,
      HEADER_MIN_HEIGHT
    } = getStyles(this.state.headerMaxHeight)

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [NEGATIVE_DISTANCE, 0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT - NEGATIVE_DISTANCE, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [NEGATIVE_DISTANCE, 0, HEADER_SCROLL_DISTANCE],
      outputRange: [107, 0, -50],
      extrapolate: 'clamp'
    })

    const imageScale = this.state.scrollY.interpolate({
      inputRange: [NEGATIVE_DISTANCE, 0],
      outputRange: [2, 1],
      extrapolate: 'clamp'
    })

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1.2, 1.2, 1],
      extrapolate: 'clamp'
    })

    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    const getImage = () => {
      if (isHome) {
        return require('../../static/images/bible.png')
      }
      if (isStudies) {
        return require('../../static/images/bible-study.jpg')
      }
      return { uri: image }
    }

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle='light-content'
          backgroundColor='rgba(0, 0, 0, 0.251)'
        />
        { React.cloneElement(children, {
          contentContainerStyle: styles.scrollViewContent,
          scrollEventThrottle: 16,
          onScroll: Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { listener: this.detectScrollViewEnd }
          )
        }) }
        <Animated.View style={[styles.header, { height: headerHeight }, headerStyle]}>
          <Animated.View
            style={[
              styles.headerContainer,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }
            ]}
          >
            {
              (image || isHome || isStudies) &&
              <Animated.Image
                style={[
                  styles.backgroundImage,
                  {
                    transform: [{ scale: imageScale }]
                  }
                ]}
                source={getImage()}
              />
            }
            {
              header &&
              <View
                style={styles.stickyContent}
                onLayout={this.getHeaderSize}
              >
                {header}
              </View>
            }
          </Animated.View>
          <View style={styles.bar}>
            {
              hasBackButton &&
              <Back
                style={styles.back}
                underlayColor='transparent'
              >
                <Icon name='chevron-left' size={24} color='white' />
              </Back>
            }
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [
                    { scale: titleScale }
                  ],
                  opacity: titleOpacity
                }
              ]}
            >
              {truncate(title, 30).toUpperCase()}
            </Animated.Text>
            {
              !!rightComponent &&
              <View style={styles.rightComponent}>
                {rightComponent}
              </View>
            }
          </View>
        </Animated.View>
      </View>
    )
  }
}
