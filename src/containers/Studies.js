import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
} from 'react-native'
import {
  StudiesList,
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
    studies: state.getIn(['studies', 'studies']),
  }),
)
export default class Studies extends Component {
  static propTypes = {
    studies: PropTypes.object.isRequired,
  }

  render() {
    const { studies } = this.props

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title="Études bibliques"
          headerStyle={{ backgroundColor: '#1A806F' }}
          isStudies
          hasBackButton={false}
        >
          <StudiesList
            headerTitle="Études bibliques"
            headerStyle={{ backgroundColor: '#1A806F' }}
            studies={studies}
          />
        </ScrollableHeader>
      </View>
    )
  }
}
