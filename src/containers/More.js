import React from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import Toast from 'react-native-simple-toast'
import { List, ListItem } from 'react-native-elements'
import {
  View,
  ScrollView,
  Alert
} from 'react-native'
import { persistedStore } from '../App'
import {
  Header,
} from '../components'
// import * as FavoritesActions from '../redux/modules/favorites'

const list = [
  {
    title: 'À propos',
    icon: 'info-outline'
  },
  {
    title: 'Aide',
    icon: 'help-outline'
  },
  {
    title: 'Nous soutenir',
    icon: 'thumb-up'
  },
  {
    title: 'Réseaux sociaux',
    icon: 'share'
  },
  {
    title: 'Noter l\'application',
    icon: 'star'
  },
  {
    title: 'Effacer les données sauvegardées',
    icon: 'delete-forever',
    onPress() {
      Alert.alert(
        'Effacer les données',
        'Toutes les données sauvegardées (questions, images, favoris) seront définitivement effacées à votre prochaine connexion et devront être re-téléchargées. Êtes-vous sur de vouloir tout supprimer ?',
        [
          { text: 'Annuler', onPress: () => {}, style: 'cancel' },
          {
            text: 'Effacer',
            onPress: () => {
              persistedStore.purge()
              Toast.show('Toutes les données ont été effacées.')
            }
          },
        ]
      )
    },
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
