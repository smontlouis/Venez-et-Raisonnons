import SQLite from 'react-native-sqlite-storage'

if (__DEV__) SQLite.DEBUG(true)
SQLite.enablePromise(true)

const okCallback = () => {}
const errorCallback = err => console.log('error', err)

let DB

export const initDB = SQLite.openDatabase({
  name: 'venez-et-raisonnons-db.db',
  readOnly: true,
  createFromLocation: '~www/venez-et-raisonnons-db.db'
}, okCallback, errorCallback)
  .then((db) => {
    DB = db
    return DB
  })


export default function getDB() {
  return DB
}
