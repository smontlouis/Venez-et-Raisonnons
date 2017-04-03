import React from 'react'
import { BibleStrongRef } from '@src/components'

const verseToStrong = ({ Texte, Livre }, version, concordanceFor) => new Promise((resolve) => {
  let splittedTexte

  // Hide codes when LSG, or only concordance
  if (version === 'LSG' || concordanceFor) {
    splittedTexte = Texte
      .split(/( \d+| \(\d+\))/)
      .map((t, i) => {
        if (t.includes(concordanceFor)) {
          return (
            <BibleStrongRef
              isFromConcordance
              book={Livre}
              reference={t}
              key={i}
            />
          )
        }
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
            reference={t}
            key={i}
          />
        )
      }

      return t
    })
  return resolve(splittedTexte)
})


export default verseToStrong
