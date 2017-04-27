// @flow

import React from 'react'
import { VerseConcordance, PaginateList } from '@src/components'
import { fromJS } from 'immutable'

type Props = {
  currentPage?: number,
  itemsPerPage: number,
  list: array,
  concordanceFor: string,
  navigation: object,
}

const ConcordanceList = ({ list, concordanceFor, navigation, itemsPerPage, currentPage } : Props) => (
  <PaginateList
    currentPage={currentPage}
    list={fromJS(list)}
    itemsPerPage={itemsPerPage}
    renderRow={item =>
      <VerseConcordance
        concordanceFor={concordanceFor}
        navigation={navigation}
        verse={item}
      />}
  />
)

export default ConcordanceList
