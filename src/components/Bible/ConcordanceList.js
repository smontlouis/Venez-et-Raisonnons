// @flow
import React from 'react'
import { pure } from 'recompose'
import { fromJS } from 'immutable'
import { VerseConcordance, PaginateList } from '@src/components'

type Props = {
  currentPage?: number,
  itemsPerPage: number,
  list: Array<Object>,
  concordanceFor: string,
  navigation: Object,
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

export default pure(ConcordanceList)
