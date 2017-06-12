import firebase from 'firebase'
import env from '../../env'

const {
  apiKey,
  databaseURL
} = env.firebase

export const firebaseDb = firebase.initializeApp({
  apiKey,
  databaseURL
}).database()

firebase.auth().signInAnonymously().catch(error => console.log(error))
