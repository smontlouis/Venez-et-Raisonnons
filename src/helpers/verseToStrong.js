import React from 'react'
import { BibleStrongRef } from '@src/components'

const verseToStrong = ({ Texte, Livre }, version) => new Promise((resolve) => {
  let splittedTexte
  if (version === 'LSG') {
    splittedTexte = Texte
      .split(/( \d+| \(\d+\))/)
      .map((t) => {
        if (t.match(/\d+/g)) {
          return null
        }

        return t
      })
    return resolve(splittedTexte)
  }

  splittedTexte = Texte
    .split(/(\d+)/)
    .map((t, i) => {
      if (Number.isInteger(Number(t)) && t !== ' ' && t !== '') {
        return (
          <BibleStrongRef
            book={Livre}
            reference={Number(t)}
            key={i}
          />
        )
      }

      return t
    })
  return resolve(splittedTexte)
})


export default verseToStrong
