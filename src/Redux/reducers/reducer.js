import { createReducer } from "@reduxjs/toolkit"
import actions from '../actions/actions'
import { combineReducers } from "redux"

const productCards = []

const productCardsReducer = createReducer(productCards, {
  [actions.addProductCard]: (state, action) => {
    return [ action.payload]
  },
  [actions.massDelete]: (state, action) => { 
    let filteredState = state.reduce((acc, item) => {
        if (!action.payload.includes(String(item.productCardId))) { return [...acc, item] }
      return acc
    }, [])
 
    return [...filteredState]
  }

})

const addStatusReducer = createReducer(false, {
  [actions.addStatusSuccess]: () =>  true
  ,
   [actions.addStatusError]: () =>  false
  
})

export default combineReducers({
  productCardsReducer,
addStatusReducer})