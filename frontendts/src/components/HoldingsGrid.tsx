import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';

import * as Types from '../types/types';

import { setPortfolioReturn } from '../features/portfolio/portfolioSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store'
import { selectHoldings } from '../features/portfolio/portfolioSlice';

// Define Columns Properties
const columns: GridColDef[] = [
  {
    field: 'ticker',
    headerClassName: 'super-app-theme--header',
    headerName: 'Ticker',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'price',
    headerClassName: 'super-app-theme--header',
    headerName: 'Price USD',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'change',
    headerClassName: 'super-app-theme--header',
    headerName: 'Change USD',
    flex: 1,
    type: 'number',
    cellClassName: (params: GridCellParams<number>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
  {
    field: 'change_percent',
    headerClassName: 'super-app-theme--header',
    headerName: 'Change %',
    flex: 1,
    type: 'number',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
  {
    field: 'shares',
    headerClassName: 'super-app-theme--header',
    headerName: 'Shares',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'value',
    headerClassName: 'super-app-theme--header',
    headerName: 'Value USD',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'weight',
    headerClassName: 'super-app-theme--header',
    headerName: 'Weight %',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
];



// Round Number to 2 decimals
function roundNumber(num: number): number {
  return parseFloat(num.toFixed(2));
}

// Calculate the Market Value
function marketValueRow(shares: number, price: number): number {
  return shares * price;
}

// Calculate the Market Value of the Previous Day
function previousValueRow(value: number, change_percent: number): number {
  const change: number = change_percent / 100
  return (1 - change)*value
}

// Create and format data to required for each Row
function createRow(holding_object: Types.Holding, index: number): Types.Row {
  const id: number = index;
  const ticker: string = holding_object.ticker;
  const shares: number = holding_object.shares;
  const price: number = roundNumber(holding_object.price);
  const change: number = roundNumber(holding_object.change);
  const change_percent: number = roundNumber(holding_object.change_percent);
  const value: number = roundNumber(marketValueRow(shares, price));
  const previousValue: number = roundNumber(previousValueRow(value, change_percent));
  return { id, ticker, shares, price, change, change_percent, value, previousValue };
}

// Returns the total value of the portfolio
function total(items: Types.Row[]): number {
  return items.map(({ value }) => value).reduce((sum, i) => sum + i, 0);
}

// Returns the total value of the portfolio on the previous day
function prevTotal(items: Types.Row[]): number {
  return items.map(({ previousValue }) => previousValue).reduce((sum, i) => sum + i, 0);
}

// Returns the weight of each asset
function weight(holding: Types.Row, total: number) {
  const weight: number = roundNumber((holding.value / total)*100)
  return { ...holding, weight }
}

export default function HoldingsGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const holdings = useSelector(selectHoldings);

  const matches = useMediaQuery('(min-width:920px)');
  const fontSize = matches ? 15 : 8;
  const margin = matches ? 5 : 0;

  let rows = holdings.length > 0 ? holdings.map((holding: Types.Holding, index: number) => createRow(holding, index)) : [];
  const totalHoldings: number | undefined = rows.length > 0 ? total(rows): undefined;
  rows = rows.length > 0 && typeof totalHoldings === 'number' ? rows.map((row: Types.Row) => weight(row, totalHoldings)) : []

  // Define the following constants in their respective components
  const prevTotalHoldings: number | undefined = rows.length > 0 ? prevTotal(rows) : undefined;
  const totalPercentChange: number | undefined = typeof totalHoldings === 'number' && typeof prevTotalHoldings === 'number' ? (1 - prevTotalHoldings / totalHoldings) * 100 : undefined;
  const totalChange: number | undefined = typeof totalHoldings === 'number' && typeof prevTotalHoldings === 'number' ? totalHoldings - prevTotalHoldings : undefined;

  React.useEffect(() => {
    dispatch(setPortfolioReturn({
      totalHoldings: totalHoldings,
      totalChange: totalChange,
      totalPercentChange: totalPercentChange
    }))
  }, [totalHoldings, totalChange, totalPercentChange, dispatch])

  return (
    <Box
      sx={{
        display: 'flex',
        m: margin,
        boxShadow: 3,
        borderRadius: 3,
        '& .super-app-theme--header': {
          backgroundColor: "primary.light",
          color: 'white',
          fontSize: fontSize
        },
        '& .super-app-theme--cell': {
          fontWeight: '700',
          fontSize: fontSize
        },
        '& .super-app.negative': {
          color: '#f44336',
          fontWeight: '700',
          fontSize: fontSize,
        },
        '& .super-app.positive': {
          color: '#4caf50',
          fontWeight: '700',
          fontSize: fontSize,
        },
      }}
    >
      <DataGrid
        rows={rows} columns={columns}
        hideFooterPagination
        autoHeight
      />
    </Box>
  );
}
