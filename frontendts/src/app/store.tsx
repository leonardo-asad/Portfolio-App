import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/authenticate/userSlice'
import displayReducer from '../features/display/displaySlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    display: displayReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
