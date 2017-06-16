// @flow

import React from 'react'
import { BibleStrongRef } from '@src/components'

import { type Verse } from '@src/types'

type VerseToStrong = (verse: Verse, version: string, concordanceFor?: number) => Object

const verseToStrong: VerseToStrong = ({ Texte, Livre }, version, concordanceFor) => new Promise((resolve) => {
  let splittedTexte: string

  // Hide codes when concordance
  if (concordanceFor) {
    const concordanceForToString = concordanceFor.toString()
    splittedTexte = Texte
      .split(/ (\(?\d+[^{.|\s}]?\d+(?!\.?\d)\)?)/g)
      .map((item, i) => {
        if (item.match(/\d+/) && (item.match(/\d+/)[0] === concordanceFor || item.match(/\d+/)[0] === `0${concordanceForToString}`)) {
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
