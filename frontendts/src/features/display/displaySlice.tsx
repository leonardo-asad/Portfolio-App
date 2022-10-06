import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  display: localStorage.getItem('token') ? 'holdings' : 'login'
}

const display = createSlice({
  name: 'display',
  initialState: initialState,
  reducers: {
    changeDisplay(state, action) {
      state.display = action.payload
    }
  }
})

export const selectDisplay = (state: RootState) => state.display.display;

export const { changeDisplay } = display.actions;
export default display.reducer;
