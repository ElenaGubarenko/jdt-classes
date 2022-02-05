import { configureStore } from "@reduxjs/toolkit"
import combinedReducers from "./reducers/reducer"

const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV === "development",
})

export default store