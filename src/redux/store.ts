import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './book/bookSlice'
import useReducer  from "./user/userSlice"
import wishReducer  from "./wishList/wishListSlice"
import { api } from './api/apiSclice'

export const store = configureStore({
  reducer: {
    user:useReducer,
    book: booksReducer,
    wish:wishReducer,
    [api.reducerPath]:api.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
