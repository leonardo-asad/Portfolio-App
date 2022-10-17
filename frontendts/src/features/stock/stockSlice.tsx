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
  noMatchingStock: false,
}

const stockSlice = createSlice({
  name: 'stock',
  initialState: initialState,
  reducers: {
    resetSearch(state) {
      state.searchStockResult = initialState.searchStockResult;
      state.isSearchingStock = initialState.isSearchingStock;
      state.failedToSearchStock = initialState.failedToSearchStock;
      state.noMatchingStock = initialState.noMatchingStock;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchStock.pending, (state, action) => {
        state.isSearchingStock = true;
        state.failedToSearchStock = false;
        state.noMatchingStock = false;
        state.searchStockResult = [];
      })
      .addCase(searchStock.rejected, (state, action) => {
        state.isSearchingStock = false;
        state.failedToSearchStock = true;
        state.noMatchingStock = false;
        state.searchStockResult = [];
      })
      .addCase(searchStock.fulfilled, (state, action) => {
        state.isSearchingStock = false;
        state.failedToSearchStock = false;
        state.searchStockResult = action.payload;
        if (action.payload.length === 0) {
          state.noMatchingStock = true;
        } else {
          state.noMatchingStock = false;
        }
      })
  }
})

export const selectSearchStockResult = (state: RootState) => state.stock.searchStockResult;
export const selectIsSearchingStock = (state: RootState) => state.stock.isSearchingStock;
export const selectNoMatchingStock = (state: RootState) => state.stock.noMatchingStock;

export const { resetSearch } = stockSlice.actions;

export default stockSlice.reducer;
