// @flow

import React from 'react'
import { FlatList } from 'react-native'
import { VerseConcordance } from '@src/components'

type Props = {
  list: array,
  concordanceFor: string,
  navigator: object,
}

const ConcordanceList = ({ list, concordanceFor, navigator } : Props) => (
  <FlatList
    data={list}
    keyExtractor={(item, i) => i}
    renderItem={({ item }) =>
      <VerseConcordance
        concordanceFor={concordanceFor}
        navigator={navigator}
        verse={item}
      />}
  />
)

export default ConcordanceList
