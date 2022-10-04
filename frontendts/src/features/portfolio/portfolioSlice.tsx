import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  portfolios: [],
  selectedPortfolio: {
    pk: '',
    name: '',
    holdings_url: '',
    purchases_url: '',
    alerts_url: ''
  },
  isLoadingPortfolios: false,
  failedToLoadPortfolios: false
}

export const fetchPortfolios = createAsyncThunk(
  'portfolio/loadPortfolios',
  async (_, { rejectWithValue }) => {
    const response = await fetch('/api/portfolio/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status !== 200) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = await response.json();
    return json;
  }
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: initialState,
  reducers: {
    addPortfolios(state, action) {
      state.portfolios = action.payload;
    },
    selectPortfolio(state, action) {
      state.selectedPortfolio = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolios.pending, (state, action) => {
        state.isLoadingPortfolios = true;
        state.failedToLoadPortfolios = false;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.isLoadingPortfolios = false;
        state.failedToLoadPortfolios = true;
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.isLoadingPortfolios = false;
        state.failedToLoadPortfolios = false;
        state.portfolios = action.payload;
      })
  }
})

export const selectPortfolios = (state: RootState) => state.portfolio.portfolios;
export const selectSelectedPortfolio = (state: RootState) => state.portfolio.selectedPortfolio;

export const { addPortfolios, selectPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
