import firebase from 'firebase'
import env from '../../env'

const {
  apiKey,
  databaseURL,
} = env.firebase

export const firebaseDb = firebase.initializeApp({
  apiKey,
  databaseURL,
}).database()
