import { createAction } from "@reduxjs/toolkit"

const addProductCard = createAction('addProductCard')

const massDelete = createAction('massDelete')

const addStatusError = createAction('addStatusError')

const addStatusSuccess = createAction('addStatusSuccess')

export default {
  addProductCard,
  massDelete,
  addStatusError,
  addStatusSuccess
}