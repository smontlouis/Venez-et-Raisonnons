import React from 'react'
import { BibleStrongRef } from '@src/components'

const verseToStrong = ({ Texte, Livre }, version, concordanceFor) => new Promise((resolve) => {
  let splittedTexte

  // Hide codes when concordance
  if (concordanceFor) {
    splittedTexte = Texte
      .split(/ (\(?\d+[^{.|\s}]?\d+(?!\.?\d)\)?)/g)
      .map((item, i) => {
        if (item.match(/\d+/) && (item.match(/\d+/)[0] === concordanceFor || item.match(/\d+/)[0] === `0${concordanceFor}`)) {
          return (
            <BibleStrongRef
              isFromConcordance
              book={Livre}
              reference={item.match(/\d+/)[0]}
              key={i}
            />
          )
        }

        if (item.match(/\d+/) && !item.includes('.')) {
          return null
        }
        return item
      })
    return resolve(splittedTexte)
  }

  // STRONG
  splittedTexte = Texte
    .split(/(\d+[^{.|\s}]?\d+(?!\.?\d))/g)
    .map((item, i) => {
      if (Number.isInteger(Number(item))) {
        return (
          <BibleStrongRef
            book={Livre}
            reference={item}
            key={i}
          />
        )
      }

      return item
    })
  return resolve(splittedTexte)
})

export default verseToStrong
