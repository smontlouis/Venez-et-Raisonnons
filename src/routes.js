import React from 'react'

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation'

import {
  Topics,
  Topic,
  Favorites,
  Profile,
  More,
  Search,
  Question,
  Master,
  Add,
} from './containers'

export const Router = createRouter(() => ({
  home: () => Master,
  topics: () => Topics,
  favorites: () => Favorites,
  search: () => Search,
  profile: () => Profile,
  more: () => More,
  topic: () => Topic,
  add: () => Add,
  question: () => Question,
}))

export default function () {
  return (
    <NavigationProvider router={Router}>
      <StackNavigation initialRoute={Router.getRoute('home')} />
    </NavigationProvider>
  )
}
