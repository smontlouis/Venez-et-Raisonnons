// @flow
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Slider from 'react-native-slider'
import { View, Text, Platform } from 'react-native'
import { pure } from 'recompose'

const styles = EStyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1
  },
  slider: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white'
  },
  track: {
    height: 2,
    borderRadius: 1
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: Platform.OS === 'ios' ? 'white' : '#1A806F',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
    top: 26
  },
  pageIndicator: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '95%'
  },
  pageIndicatorText: {
    fontFamily: '$font.heading',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 50,
    paddingBottom: 50
  }
})

type Props = {
  currentPage: number,
  onSlidingComplete: Function,
  pages: number
}

type State = {
  value: number,
  slidingStart: boolean
}

@pure
export default class PaginateSlider extends Component {
  props: Props
  state: State

  constructor (props: Props) {
    super(props)
    this.state = {
      value: 1,
      slidingStart: false
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({ value: nextProps.currentPage })
    }
  }

  onSlidingStart = () => {
    this.setState({ slidingStart: true })
  }

  onSlidingComplete = (value: number) => {
    const { onSlidingComplete } = this.props
    this.setState({ slidingStart: false })
    onSlidingComplete(value)
  }

  render () {
    const { pages } = this.props

    if (pages < 2) {
      return null
    }

    return (
      <View style={styles.container}>
        {
          this.state.slidingStart &&
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>Page {this.state.value}</Text>
          </View>
        }
        <Slider
          step={1}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          onSlidingStart={this.onSlidingStart}
          onSlidingComplete={this.onSlidingComplete}
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor='#1A806F'
          maximumTrackTintColor='#b7b7b7'
          minimumValue={1}
          maximumValue={pages}
        />
      </View>
    )
  }
}
