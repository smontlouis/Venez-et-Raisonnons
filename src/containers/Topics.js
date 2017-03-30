import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
} from 'react-native'
import {
  TopicsList,
  ScrollableHeader,
} from '@src/components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})


@connect(
  state => ({
    topics: state.getIn(['topics', 'topics']),
  }),
)
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
  }

  render() {
    const { topics } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title="Venez Et Raisonnons"
          isHome
          hasBackButton={false}
        >
          <TopicsList
            headerTitle="Venez et Raisonnons"
            topics={topics}
          />
        </ScrollableHeader>
      </View>
    )
  }
}
