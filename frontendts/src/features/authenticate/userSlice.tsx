import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from '../../interfaces/interfaces'

const initialState = {
  username: '',
  isLoggedIn: localStorage.getItem('token') ? true : false,
  isLoadingUser: false,
  failedToLoadUser: false,
  isAuthenticatingUser: false,
  failedToAuthenticateUser: false,
  isCreatingUser: false,
  failedToCreateUser: false
}

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch('/api/user/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status !== 200) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = await response.json();
    return json;
  }
)

export const authenticateUser = createAsyncThunk(
  'user/authenticateUser',
  async (user: User, { rejectWithValue }) => {
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
    if (response.status !== 200) {
      const json = await response.json();
      return rejectWithValue(json)
    }
    const json = await response.json();
    json['username'] = user.username;
    return json;
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: User, { rejectWithValue }) => {
    const response = await fetch('/api/create_user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password
      }),
    })
    if (response.status !== 201) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = await response.json();
    return json;
  }
)

const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    removeUser(state) {
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
      .addCase(createUser.pending, (state, action) => {
        state.isCreatingUser = true;
        state.failedToCreateUser = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreatingUser = false;
        state.failedToCreateUser = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreatingUser = false;
        state.failedToCreateUser = false;
        state.isLoggedIn = true;
        state.username = action.payload.username;
        localStorage.setItem('token', action.payload.token);
      })
  }
})

export const selectUsername = (state: RootState) => state.user.username;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectIsLoadingUser = (state: RootState) => state.user.isLoadingUser;
export const selectFailedToLoadUser = (state: RootState) => state.user.failedToLoadUser;

export default user.reducer;
