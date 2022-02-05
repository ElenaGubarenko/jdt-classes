const products = state => {
  return state.productCardsReducer
}

const addStatus = state => {
  return state.addStatusReducer
}

export default {
  products,
  addStatus
}