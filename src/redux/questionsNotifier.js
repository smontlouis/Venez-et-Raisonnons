const shallowDiff = (base, compared) => Object.keys(compared).reduce((acc, idx) => {
  if (!(idx in base) && compared[idx].standalone) return { ...acc, [idx]: compared[idx] }
  return acc
}, {})

export default store => next => (action) => {
  const prevState = store.getState() || {}
  const returnValue = next(action)
  const newState = store.getState()

  const base = prevState.getIn(['questions', 'questions']).toJS()
  const compared = newState.getIn(['questions', 'questions']).toJS()

  // If object is empty, that mean it's first time loading, don't spam with notificiations
  if (Object.keys(base).length === 0) {
    return returnValue
  }

  if (action.type === 'app/LOAD_DATA_SUCCESS') {
    store.dispatch({ type: 'questions/NOTIF_NEW_QUESTIONS', result: shallowDiff(base, compared) })
  }

  return returnValue
}
