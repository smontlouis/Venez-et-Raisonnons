import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Animated,
  Platform,
  StatusBar,
  View,
  Image,
} from 'react-native';
import { Back } from '../components';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = EStyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '$color.primary',
    overflow: 'hidden',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  stickyContent: {
    position: 'absolute',
    top: HEADER_MIN_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
  },
  bar: {
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 32,
    marginLeft: 10,
  },
  title: {
    color: 'white',
    fontFamily: '$font.heading',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class ScrollableHeader extends Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    header: PropTypes.element,
    image: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const { children, title, header, image } = this.props;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1.2, 1.2, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        { React.cloneElement(children, {
          contentContainerStyle: styles.scrollViewContent,
          scrollEventThrottle: 16,
          onScroll: Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          ),
        }) }
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={[
              styles.headerContainer,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
            ]}
          >
            {
              image &&
              <Image
                style={styles.backgroundImage}
                source={{ uri: image }}
              />
          }
            <View style={styles.stickyContent}>
              {header}
            </View>
          </Animated.View>
          <View style={styles.bar}>
            <Back
              style={styles.back}
              underlayColor="transparent"
            >
              <Icon name="chevron-thin-left" size={18} color="white" />
            </Back>
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{ scale: titleScale }, { translateY: titleTranslate }],
                  opacity: titleOpacity,
                }
              ]}
            >
              {title.toUpperCase()}
            </Animated.Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}
