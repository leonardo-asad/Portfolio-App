import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Types from '../../types/types'
import { RootState } from "../../app/store";

export const searchStock = createAsyncThunk(
  'stock/searchStock',
  async (query: string, { rejectWithValue }) => {
    const response = await fetch(`/api/stocksearch/?query=${query}`)
    if (response.status !== 200) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = await response.json();
    return json;
  }
)

const initialState: Types.StockSliceInitialState = {
  searchStockResult: [],
  isSearchingStock: false,
  failedToSearchStock: false,
}

const stockSlice = createSlice({
  name: 'stock',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchStock.pending, (state, action) => {
        state.isSearchingStock = true;
        state.failedToSearchStock = false;
      })
      .addCase(searchStock.rejected, (state, action) => {
        state.isSearchingStock = false;
        state.failedToSearchStock = true;
      })
      .addCase(searchStock.fulfilled, (state, action) => {
        state.isSearchingStock = false;
        state.failedToSearchStock = false;
        state.searchStockResult = action.payload;
      })
  }
})

export const selectSearchStockResult = (state: RootState) => state.stock.searchStockResult;
export const selectIsSearchingStock = (state: RootState) => state.stock.isSearchingStock;

export default stockSlice.reducer;
