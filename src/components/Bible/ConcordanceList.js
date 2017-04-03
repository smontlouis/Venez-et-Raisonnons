// @flow

import React from 'react'
import { VerseConcordance, List } from '@src/components'
import { fromJS } from 'immutable'

type Props = {
  list: array,
  concordanceFor: string,
  navigator: object,
}

const ConcordanceList = ({ list, concordanceFor, navigator } : Props) => (
  <List
    listItems={fromJS(list)}
    renderRow={item =>
      <VerseConcordance
        concordanceFor={concordanceFor}
        navigator={navigator}
        verse={item}
      />}
  />
)

export default ConcordanceList
