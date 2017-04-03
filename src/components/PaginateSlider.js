import React, { Component, PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Slider from 'react-native-slider'
import { View, Text } from 'react-native'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    height: 50,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
    top: 22,
  },
  pageIndicator: {
    left: 0,
    right: 0,
    height: '88%',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageIndicatorText: {
    fontFamily: '$font.heading',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  }
})

export default class PaginateSlider extends Component {
  static propTypes = {
    onSlidingComplete: PropTypes.func.isRequired,
    pages: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      slidingStart: false,
    }

    this.onSlidingStart = ::this.onSlidingStart
    this.onSlidingComplete = ::this.onSlidingComplete
  }

  onSlidingStart() {
    this.setState({ slidingStart: true })
  }

  onSlidingComplete(value) {
    const { onSlidingComplete } = this.props
    this.setState({ slidingStart: false })
    onSlidingComplete(value)
  }

  render() {
    const { pages } = this.props
    return (
      <View style={styles.container}>
        <Slider
          step={1}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          onSlidingStart={this.onSlidingStart}
          onSlidingComplete={this.onSlidingComplete}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor="#1A806F"
          maximumTrackTintColor="#b7b7b7"
          minimumValue={1}
          maximumValue={pages}
        />
        {
          this.state.slidingStart &&
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>Page {this.state.value}</Text>
          </View>
        }
      </View>
    )
  }
}
