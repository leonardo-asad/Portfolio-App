import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';

const columns = [
  {
    field: 'ticker',
    headerClassName: 'super-app-theme--header',
    headerName: 'Ticker',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'date',
    headerClassName: 'super-app-theme--header',
    headerName: 'Date',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'price',
    headerClassName: 'super-app-theme--header',
    headerName: 'Price',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'shares',
    headerClassName: 'super-app-theme--header',
    headerName: 'Shares',
    flex: 1,
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
];

function createRow(trade_object, index) {
  const id = index;
  const ticker = trade_object.ticker;
  const date = trade_object.date;
  const price = trade_object.price;
  const shares = trade_object.shares;

  return { id, ticker, date, price, shares };
}

export default function TradesGrid(props) {
  const matches = useMediaQuery('(min-width:920px)');
  const fontSize = matches ? 15 : 8;
  const margin = matches ? 5 : 0;

  let rows = props.trades.map((trade_object, index) => createRow(trade_object, index));

  return (
    <Box
      sx={{
        display: 'flex',
        mx: margin,
        my: 5,
        boxShadow: 3,
        borderRadius: 3,
        '& .super-app-theme--header': {
          backgroundColor: "primary.main",
          color: 'white',
          fontSize: fontSize
        },
        '& .super-app-theme--cell': {
          fontWeight: '700',
          fontSize: fontSize,
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
