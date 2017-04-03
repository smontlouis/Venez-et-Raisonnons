// @flow

import React from 'react'
import { VerseConcordance, PaginateList } from '@src/components'
import { fromJS } from 'immutable'

type Props = {
  currentPage?: number,
  itemsPerPage: number,
  list: array,
  concordanceFor: string,
  navigator: object,
}

const ConcordanceList = ({ list, concordanceFor, navigator, itemsPerPage, currentPage } : Props) => (
  <PaginateList
    currentPage={currentPage}
    list={fromJS(list)}
    itemsPerPage={itemsPerPage}
    renderRow={item =>
      <VerseConcordance
        concordanceFor={concordanceFor}
        navigator={navigator}
        verse={item}
      />}
  />
)

export default ConcordanceList
