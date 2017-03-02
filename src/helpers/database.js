import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true)
SQLite.enablePromise(true)

const okCallback = () => console.log('ok')
const errorCallback = err => console.log('error', err)

let DB

export function initDB() {
  SQLite.openDatabase({
    name: 'venez-et-raisonnons-db.db',
    readOnly: true,
    createFromLocation: '~www/venez-et-raisonnons-db.db'
  }, okCallback, errorCallback)
    .then((db) => {
      DB = db
    })
}

export default function getDB() {
  return DB
}
