// @flow
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { pure } from 'recompose'

import { TopicItem, HeaderList } from './index'

const styles = EStyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 20
  }
})

type Props = {
  headerTitle?: string,
  topics: Object,
  contentContainerStyle?: number
}

const TopicsList = ({ headerTitle, topics, contentContainerStyle, ...props }: Props) =>
  <FlatList
    data={Object.values(topics.toJS())}
    ListHeaderComponent={() => headerTitle && <HeaderList title={headerTitle} />}
    keyExtractor={(item, index) => item.id}
    renderItem={({ item }: any) => (
      <TopicItem
        id={item.id}
        title={item.title}
        imageUrl={item.image_url}
      />
    )}
    contentContainerStyle={[styles.container, contentContainerStyle]}
    {...props}
  />

export default pure(TopicsList)
