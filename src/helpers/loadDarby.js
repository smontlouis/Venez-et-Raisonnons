let DarbyBible

export default function loadDarby() {
  return new Promise((resolve, reject) => {
    if (DarbyBible) {
      resolve(DarbyBible)
      return
    }
    try {
      DarbyBible = require('./bible-darby.json')

      resolve(DarbyBible)
    } catch (e) {
      reject('Erreur', e)
    }
  })
}
