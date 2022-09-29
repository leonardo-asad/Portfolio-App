import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  isLoggedIn: localStorage.getItem('token') ? true : false
}

const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addUser(state, action) {
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    removeUser(state, action) {
      state.username = action.payload.username;
      state.isLoggedIn = false;
    }
  }
})
