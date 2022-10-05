import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import * as Interface from '../../interfaces/interfaces'

const initialState: Interface.PortfolioInitialState = {
  portfolios: [],
  selectedPortfolio: {
    selectedPortfolio: {
      pk: '',
      name: '',
      holdings_url: '',
      purchases_url: '',
      alerts_url: ''
    },
    holdings: [],
    trades: [],
    portfolioReturn: {
      totalHoldings: undefined,
      totalChange: undefined,
      totalPercentChange: undefined
    },
  },
  isLoadingPortfolios: false,
  failedToLoadPortfolios: false,
  isLoadingHoldings: true,
  failedToLoadHoldings: false,
  isLoadingTrades: true,
  failedToLoadTrades: false,
  isAddingPortfolio: false,
  failedToAddPortfolio: false,
  isEditingPortfolio: false,
  failedToEditPortfolio: false,
  isDeletingPortfolio: false,
  failedToDeletePortfolio: false
}

export const loadPortfolios = createAsyncThunk(
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

export const createPortfolio = createAsyncThunk(
  'portfolio/createPortfolio',
  async (name: string, { rejectWithValue }) => {
    const response = await fetch('/api/portfolio/', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': name})
    })
    if (response.status !== 201) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = await response.json();
    return json;
  }
)

export const editPortfolio = createAsyncThunk(
  'portfolio/EditPortfolio',
  async (portfolioToEdit: {pk: string, name: string}, { rejectWithValue }) => {
    const response = await fetch(`/api/portfolio/${portfolioToEdit.pk}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': portfolioToEdit.name})
    })
    if (response.status !== 200) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = response.json();
    return json;
  }
)

export const deletePortfolio = createAsyncThunk(
  'portfolio/deletePortfolio',
  async (pk: string, { rejectWithValue }) => {
    const response = await fetch(`/api/portfolio/${pk}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status !== 204) {
      const json = await response.json();
      return rejectWithValue(json);
    }
    const json = await response.json();
    json['pk'] = pk;
    return json;
  }
)

export const loadHoldings = createAsyncThunk(
  'portfolio/loadHoldings',
  async(holdingsUrl: string, { rejectWithValue }) => {
    const response = await fetch(holdingsUrl, {
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

export const loadTrades = createAsyncThunk(
  'portfolio/loadTrades',
  async(tradesUrl: string, { rejectWithValue }) => {
    const response = await fetch(tradesUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status !== 200) {
      const json = await response.json();
      return rejectWithValue(json)
    }
    const json = await response.json();
    return json;
  }
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: initialState,
  reducers: {
    setPortfolios(state, action) {
      state.portfolios = action.payload;
    },
    selectPortfolio(state, action) {
      state.selectedPortfolio.selectedPortfolio = action.payload;
    },
    setHoldings(state, action) {
      state.selectedPortfolio.holdings = action.payload;
    },
    setTrades(state, action) {
      state.selectedPortfolio.trades = action.payload;
    },
    setPortfolioReturn(state, action) {
      state.selectedPortfolio.portfolioReturn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPortfolios.pending, (state, action) => {
        state.isLoadingPortfolios = true;
        state.failedToLoadPortfolios = false;
      })
      .addCase(loadPortfolios.rejected, (state, action) => {
        state.isLoadingPortfolios = false;
        state.failedToLoadPortfolios = true;
      })
      .addCase(loadPortfolios.fulfilled, (state, action) => {
        state.isLoadingPortfolios = false;
        state.failedToLoadPortfolios = false;
        state.portfolios = action.payload;
      })
      .addCase(loadHoldings.pending, (state, action) => {
        state.isLoadingHoldings = true;
        state.failedToLoadHoldings = false;
      })
      .addCase(loadHoldings.rejected, (state, action) => {
        state.isLoadingHoldings = false;
        state.failedToLoadHoldings = true;
      })
      .addCase(loadHoldings.fulfilled, (state, action) => {
        state.isLoadingHoldings = false;
        state.failedToLoadHoldings = false;
        state.selectedPortfolio.holdings = action.payload;
      })
      .addCase(loadTrades.pending, (state, action) => {
        state.isLoadingTrades = true;
        state.failedToLoadTrades = false;
      })
      .addCase(loadTrades.rejected, (state, action) => {
        state.isLoadingTrades = false;
        state.failedToLoadTrades = true;
      })
      .addCase(loadTrades.fulfilled, (state, action) => {
        state.isLoadingTrades = false;
        state.failedToLoadTrades = false;
        state.selectedPortfolio.trades = action.payload;
      })
      .addCase(createPortfolio.pending, (state, action) => {
        state.isAddingPortfolio = true;
        state.failedToAddPortfolio = false;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.isAddingPortfolio = false;
        state.failedToAddPortfolio = true;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.isAddingPortfolio = false;
        state.failedToAddPortfolio = false;
        state.portfolios.push(action.payload);

      })
      .addCase(editPortfolio.pending, (state, action) => {
        state.isEditingPortfolio = true;
        state.failedToEditPortfolio = false;
      })
      .addCase(editPortfolio.rejected, (state, action) => {
        state.isEditingPortfolio = false;
        state.failedToEditPortfolio = true;
      })
      .addCase(editPortfolio.fulfilled, (state, action) => {
        state.isEditingPortfolio = false;
        state.failedToEditPortfolio = false;
        state.portfolios = state.portfolios.map(portfolio => {
          if (portfolio.pk === action.payload.pk) {
            return {...portfolio, name: action.payload.name};
          }
          return portfolio;
        })
      })
      .addCase(deletePortfolio.pending, (state, action) => {
        state.isDeletingPortfolio = true;
        state.failedToDeletePortfolio = false;
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.isDeletingPortfolio = false;
        state.failedToDeletePortfolio = true;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.isDeletingPortfolio = false;
        state.failedToDeletePortfolio = false;
        state.portfolios = state.portfolios.filter(portfolio => portfolio.pk !== action.payload.pk);
        state.selectedPortfolio = initialState.selectedPortfolio;
      })
  }
})

export const selectPortfolios = (state: RootState) => state.portfolio.portfolios;
export const selectSelectedPortfolio = (state: RootState) => state.portfolio.selectedPortfolio.selectedPortfolio;
export const selectHoldings = (state: RootState) => state.portfolio.selectedPortfolio.holdings;
export const selectIsLoadingHoldings = (state: RootState) => state.portfolio.isLoadingHoldings;
export const selectTrades = (state: RootState) => state.portfolio.selectedPortfolio.trades;
export const selectIsLoadingTrades = (state: RootState) => state.portfolio.isLoadingTrades;
export const selectPortfolioReturn = (state: RootState) => state.portfolio.selectedPortfolio.portfolioReturn;

export const { setPortfolios, selectPortfolio, setHoldings, setTrades, setPortfolioReturn } = portfolioSlice.actions;
export default portfolioSlice.reducer;
