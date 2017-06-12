const DarbyBible = require('./bible-darby.json')
const OSTBible = require('./bible-ostervald.json')
const LSGBible = require('./bible-lsg-1910.json')

export default function loadBible (bible) {
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
      reject('Erreur', e)
    }
  })
}
