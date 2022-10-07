import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'
import displayReducer from '../features/display/displaySlice'
import portfolioReducer from '../features/portfolio/portfolioSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    display: displayReducer,
    portfolio: portfolioReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
