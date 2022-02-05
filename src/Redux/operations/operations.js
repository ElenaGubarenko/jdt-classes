import actions from '../actions/actions'

const addProductCard = (card) => (dispatch) => {
  dispatch(actions.addProductCard(card))
}

const massDelete = (arrOfIdToDelete) => (dispatch) => {
  dispatch(actions.massDelete(arrOfIdToDelete))
}

const addStatusError = () => (dispatch) => {
  dispatch(actions.addStatusError())
}

const addStatusSuccess = () => (dispatch) => {
  dispatch(actions.addStatusSuccess())
}
  

export default {
  addProductCard,
  massDelete,
  addStatusError, 
  addStatusSuccess
}