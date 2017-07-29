// @flow

import SQLite from 'react-native-sqlite-storage'

if (__DEV__) SQLite.DEBUG(true)
SQLite.enablePromise(true)

const okCallback = () => {}
const errorCallback = (err: string) => console.log('error', err)

type Results = {
  rows: {
    length: number,
    item: (i: number) => Object
  }
}
let DB: {
  executeSql: (req: string) => Promise<Array<Results>>
}

export const initDB: typeof DB = SQLite.openDatabase({
  name: 'venez-et-raisonnons-db.db',
  readOnly: true,
  createFromLocation: '~www/venez-et-raisonnons-db.db'
}, okCallback, errorCallback)
  .then((db: typeof DB) => {
    DB = db
    return DB
  })

export default function getDB () {
  return DB
}
