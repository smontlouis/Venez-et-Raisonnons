import React from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { List, ListItem } from 'react-native-elements'
import {
  View,
  ScrollView,
} from 'react-native'
import { persistedStore } from '../App'
import {
  Header,
} from '../components'
// import * as FavoritesActions from '../redux/modules/favorites'

const list = [
  {
    title: 'Purge',
    icon: 'av-timer',
    onPress() {
      console.log('purged')
      persistedStore.purge()
    },
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
]

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF0F4',
  },
})

const More = () =>
  <View style={styles.container}>
    <Header
      title="Plus"
      hasBackButton={false}
    />
    <ScrollView>
      <List>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={item.onPress && item.onPress}
            />
          ))
        }
      </List>
    </ScrollView>
  </View>


export default connect(
  () => ({

  }),
  // FavoritesActions,
)(More)
