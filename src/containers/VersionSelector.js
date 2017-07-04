import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import * as BibleActions from '@src/redux/modules/bible'

import { View, FlatList } from 'react-native'

import { Header, VersionSelectorItem } from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20
  }
})

type Props = {
  navigation: Object,
  setVersion: Function,
}

const versions = fromJS({
  STRONG: {
    id: 'STRONG',
    name: 'Bible Second 1910 Strong'
  },
  LSG: {
    id: 'LSG',
    name: 'Bible Second 1910'
  },
  FRDBY: {
    id: 'FRDBY',
    name: 'Bible Darby en français'
  },
  OST: {
    id: 'OST',
    name: 'Ostervald'
  }
})

const setAndClose = (setVersion, navigation, vers) => {
  setVersion(vers)
  navigation.goBack()
}

const VersionSelector = ({ setVersion, navigation }: Props) => (
  <View style={styles.container}>
    <Header title='Versions' />
    <FlatList
      data={Object.values(versions.toJS())}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }: any) => (
        <VersionSelectorItem
          onChange={vers => setAndClose(setVersion, navigation, vers)}
          version={item}
          isSelected={item.id === navigation.state.params.version}
        />
      )}
      style={styles.list}
    />
  </View>
)

export default connect(null, BibleActions)(VersionSelector)
