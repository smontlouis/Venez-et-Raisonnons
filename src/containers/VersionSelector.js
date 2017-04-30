import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import * as BibleActions from '@src/redux/modules/bible'

import {
  View,
} from 'react-native'

import { Header, VersionSelectorItem, List } from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
})

type Props = {
  version: string,
  navigation: object,
  setVersion: func,
}

const versions = fromJS({
  STRONG: {
    id: 'STRONG',
    name: 'Bible Second 1910 Strong',
  },
  LSG: {
    id: 'LSG',
    name: 'Bible Second 1910',
  },
  FRDBY: {
    id: 'FRDBY',
    name: 'Bible Darby en français'
  },
  OST: {
    id: 'OST',
    name: 'Ostervald'
  },
})

const setAndClose = (setVersion, navigation, vers) => {
  setVersion(vers)
  navigation.goBack()
}

const VersionSelector = ({ version, setVersion, navigation }: Props) => (
  <View style={styles.container}>
    <Header title="Versions" />
    <List
      listItems={versions}
      renderRow={v =>
        <VersionSelectorItem
          onChange={vers => setAndClose(setVersion, navigation, vers)}
          version={v}
          isSelected={v.id === version}
        />
      }
      style={styles.list}
    />
  </View>
)

export default connect(null, BibleActions)(VersionSelector)
