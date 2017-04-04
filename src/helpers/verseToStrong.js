import React from 'react'
import { BibleStrongRef } from '@src/components'

const verseToStrong = ({ Texte, Livre }, version, concordanceFor) => new Promise((resolve) => {
  let splittedTexte

  // Hide codes when LSG
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

  // Hide codes when concordance
  if (concordanceFor) {
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
