import React from 'react'
import { BibleStrongRef } from '@src/components'

const verseToStrong = ({ Texte, Livre }) => new Promise((resolve) => {
  const splittedTexte = Texte
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
  resolve(splittedTexte)
})


export default verseToStrong
