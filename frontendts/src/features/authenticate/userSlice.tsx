import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from '../../interfaces/interfaces'

const initialState = {
  username: '',
  isLoggedIn: localStorage.getItem('token') ? true : false,
  isLoadingUser: false,
  failedToLoadUser: false,
  isAuthenticatingUser: false,
  failedToAuthenticateUser: false
}

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async () => {
    const response = await fetch('/api/user/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const json = await response.json();
    return json;
  }
)

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (user: User) => {
    const response = await fetch('/api/token/', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify({
          username: user.username,
          password: user.password
        })
    })
    const json = await response.json();
    json['username'] = user.username;
    return json;
  }
)

const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    removeUser(state, action) {
      state.username = '';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state, action) => {
        state.isLoadingUser = true;
        state.failedToLoadUser = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.failedToLoadUser = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.failedToLoadUser = false;
        state.username = action.payload.username;
        state.isLoggedIn = true;
      })
      .addCase(authenticateUser.pending, (state, action) => {
        state.isAuthenticatingUser = true;
        state.failedToAuthenticateUser = false;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isAuthenticatingUser = false;
        state.failedToAuthenticateUser = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isAuthenticatingUser = false;
        state.failedToAuthenticateUser = false;
        state.username = action.payload.username;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.access);
      })
  }
})

export const selectUsername = (state: RootState) => state.user.username;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectIsLoadingUser = (state: RootState) => state.user.isLoadingUser;
export const selectFailedToLoadUser = (state: RootState) => state.user.failedToLoadUser;

export const { removeUser } = user.actions;
export default user.reducer;
