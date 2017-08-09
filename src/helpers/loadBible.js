// @flow

const DarbyBible: Object = require('./bible-darby.json')
const OSTBible: Object = require('./bible-ostervald.json')
const LSGBible: Object = require('./bible-lsg-1910.json')

export default function loadBible (bible: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      switch (bible) {
        case 'FRDBY': {
          resolve(DarbyBible)
          break
        }
        case 'OST': {
          resolve(OSTBible)
          break
        }
        case 'LSG': {
          resolve(LSGBible)
          break
        }
        default: {
          resolve(DarbyBible)
        }
      }
    } catch (e) {
      reject(new Error('Erreur', e))
    }
  })
}
