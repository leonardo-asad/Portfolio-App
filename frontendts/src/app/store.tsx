import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'
import portfolioReducer from '../features/portfolio/portfolioSlice'
import stockReducer from '../features/stock/stockSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    portfolio: portfolioReducer,
    stock: stockReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
