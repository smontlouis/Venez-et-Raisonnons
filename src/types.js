// @flow

export type Verse = {
  Texte: string,
  Verset: number,
  Livre: number,
  Chapitre: number
}

export type Book = {
  Numero: number,
  Nom: string,
  Chapitres: number
}

export type VerseId = { livre: string, chapitre: string, verset: string }
