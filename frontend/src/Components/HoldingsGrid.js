import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';


const columns = [
  {
    field: 'ticker',
    headerName: 'Ticker',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'change',
    headerName: 'Change',
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
    field: 'change_percent',
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
    headerName: 'Shares',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'value',
    headerName: 'Value USD',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'weight',
    headerName: 'Weight %',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
];

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function marketValueRow(shares, price) {
  return shares * price;
}


function createRow(holding_object, index) {
  const id = index;
  const ticker = holding_object.ticker;
  const shares = ccyFormat(parseFloat(holding_object.shares));
  const price = ccyFormat(parseFloat(holding_object.price));
  const change = ccyFormat(parseFloat(holding_object.change));
  const change_percent = ccyFormat(parseFloat(holding_object.change_percent));
  const value = ccyFormat(marketValueRow(shares, price));
  return { id, ticker, shares, price, change, change_percent, value };
}

function total(items) {
  return items.map(({ value }) => parseFloat(value)).reduce((sum, i) => sum + i, 0);
}

function weight(holding, total) {

  const value = parseFloat(holding.value);

  const weight = ccyFormat((value / total)*100)

  return { ...holding, weight }
}

// const rows = [
//   {
//     id: 1,
//     ticker: 'AAPL',
//     price: 100,
//     change: -5,
//     change_percent: -5,
//     shares: 10,
//     value:1000,
//     weight: 100
//   },

// ];

export default function HoldingsGrid(props) {
  let rows = props.holdings.map((holding, index) => createRow(holding, index));
  //debugger

  const holdingsSubtotal = ccyFormat(total(rows));

  rows = rows.map(row => weight(row, holdingsSubtotal))


  return (
    <Box
      sx={{
        m: 5,
        '& .super-app-theme--cell': {
          fontWeight: '600',
        },
        '& .super-app.negative': {
          color: '#f44336',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          color: '#4caf50',
          fontWeight: '600',
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
