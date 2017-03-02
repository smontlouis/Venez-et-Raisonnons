import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Toast from 'react-native-simple-toast'
import { List, ListItem } from 'react-native-elements'
import { withNavigation } from '@exponent/ex-navigation'
import {
  View,
  ScrollView,
  Alert,
  Linking,
} from 'react-native'
import { Router } from '../routes'
import { persistedStore } from '../App'
import {
  Header,
} from '../components'

const primaryList = [
  {
    title: 'Poser une question',
    icon: 'add-circle',
    onPress(navigator) {
      navigator.push(Router.getRoute('add'))
    }
  }
]

const secondaryList = [
  {
    title: 'À propos',
    icon: 'info-outline',
    onPress(navigator) {
      navigator.push(Router.getRoute('about'))
    }
  },
  // {
  //   title: 'Aide',
  //   icon: 'help-outline'
  // },
  {
    title: 'Nous soutenir',
    icon: 'thumb-up',
    onPress() {
      Linking
        .openURL('https://igg.me/at/CVE7THZnG6w')
        .catch(err => console.log(err))
    }
  },
  // {
  //   title: 'Réseaux sociaux',
  //   icon: 'share'
  // },
  {
    title: 'Nous contacter',
    icon: 'mail',
    onPress() {
      Linking
        .openURL('mailto:venezetraisonnons@gmail.com')
    }
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

const More = ({ navigator }) =>
  <View style={styles.container}>
    <Header
      title="Plus"
      hasBackButton={false}
    />
    <ScrollView>
      <List>
        {
          primaryList.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() => item.onPress && item.onPress(navigator)}
            />
          ))
        }
      </List>
      <List>
        {
          secondaryList.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() => item.onPress && item.onPress(navigator)}
            />
          ))
        }
      </List>
    </ScrollView>
  </View>

More.propTypes = {
  navigator: PropTypes.object.isRequired,
}


export default withNavigation(More)
