// @flow

import React from 'react'
import {
  Platform,
  View,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
import bibleStrongText from '@src/markdown/bibleStrong'
import {
  Link,
} from '@src/components'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primaryDarken',
    height: '$header.height',
    paddingTop: Platform.OS === 'ios' ? 18 : 24,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

type Props = {
  book: object,
  chapter: number,
  version: string,
}

export default ({ book, chapter, version }: Props) =>
  <View style={styles.container}>
    <Link route={'bibleSelector'} style={styles.titleContainer}>
      <Text style={styles.title}>{book.Nom} {chapter}</Text>
      <Icon
        name="arrow-drop-down"
        size={20}
        color="white"
      />
    </Link>
    <Link route={'versionSelector'} params={{ version }} style={styles.titleContainer}>
      <Text style={styles.title}>{version}</Text>
      <Icon
        name="arrow-drop-down"
        size={20}
        color="white"
      />
    </Link>
    {
      version === 'STRONG' &&
      <Link
        route={'modal'}
        params={{ title: 'Qu\'est-ce que la Bible Strong ?', text: bibleStrongText }}
        style={styles.icon}
      >
        <Icon name="help" size={24} color="white" />
      </Link>
    }
  </View>

