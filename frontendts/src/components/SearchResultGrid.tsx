import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';

const data = [
  {
      "symbol": "IBM",
      "name": "International Business Machines Corp",
      "type": "Equity",
      "region": "United States",
      "marketOpen": "09:30:00",
      "marketClose": "16:00:00",
      "timezone": "UTC-04",
      "currency": "USD",
      "matchScore": 1.0
  },
  {
      "symbol": "IBMK",
      "name": "iShares iBonds Dec 2022 Term Muni Bond ETF",
      "type": "ETF",
      "region": "United States",
      "marketOpen": "09:30:00",
      "marketClose": "16:00:00",
      "timezone": "UTC-04",
      "currency": "USD",
      "matchScore": 0.8571
  },
  {
      "symbol": "IBML",
      "name": "iShares iBonds Dec 2023 Term Muni Bond ETF",
      "type": "ETF",
      "region": "United States",
      "marketOpen": "09:30:00",
      "marketClose": "16:00:00",
      "timezone": "UTC-04",
      "currency": "USD",
      "matchScore": 0.8571
  },
  {
      "symbol": "IBMM",
      "name": "iShares iBonds Dec 2024 Term Muni Bond ETF",
      "type": "ETF",
      "region": "United States",
      "marketOpen": "09:30:00",
      "marketClose": "16:00:00",
      "timezone": "UTC-04",
      "currency": "USD",
      "matchScore": 0.8571
  },
  {
      "symbol": "IBMN",
      "name": "iShares iBonds Dec 2025 Term Muni Bond ETF",
      "type": "ETF",
      "region": "United States",
      "marketOpen": "09:30:00",
      "marketClose": "16:00:00",
      "timezone": "UTC-04",
      "currency": "USD",
      "matchScore": 0.8571
  },
  {
      "symbol": "IBMO",
      "name": "iShares iBonds Dec 2026 Term Muni Bond ETF",
      "type": "ETF",
      "region": "United States",
      "marketOpen": "09:30:00",
      "marketClose": "16:00:00",
      "timezone": "UTC-04",
      "currency": "USD",
      "matchScore": 0.8571
  },
  {
      "symbol": "IBM.FRK",
      "name": "International Business Machines",
      "type": "Equity",
      "region": "Frankfurt",
      "marketOpen": "08:00:00",
      "marketClose": "20:00:00",
      "timezone": "UTC+02",
      "currency": "EUR",
      "matchScore": 0.75
  },
  {
      "symbol": "IBM.LON",
      "name": "International Business Machines Corporation",
      "type": "Equity",
      "region": "United Kingdom",
      "marketOpen": "08:00:00",
      "marketClose": "16:30:00",
      "timezone": "UTC+01",
      "currency": "USD",
      "matchScore": 0.75
  },
  {
      "symbol": "IBM.DEX",
      "name": "International Business Machines",
      "type": "Equity",
      "region": "XETRA",
      "marketOpen": "08:00:00",
      "marketClose": "20:00:00",
      "timezone": "UTC+02",
      "currency": "EUR",
      "matchScore": 0.6667
  },
  {
      "symbol": "IBMB34.SAO",
      "name": "International Business Machines Corp",
      "type": "Equity",
      "region": "Brazil/Sao Paolo",
      "marketOpen": "10:00:00",
      "marketClose": "17:30:00",
      "timezone": "UTC-03",
      "currency": "BRL",
      "matchScore": 0.5
  }
]

const columns: GridColDef[] = [
  {
    field: 'symbol',
    headerClassName: 'super-app-theme--header',
    headerName: 'Symbol',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'name',
    headerClassName: 'super-app-theme--header',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'type',
    headerClassName: 'super-app-theme--header',
    headerName: 'Type',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'region',
    headerClassName: 'super-app-theme--header',
    headerName: 'Region',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
];


export default function SearchResultGrid() {
  const matches = useMediaQuery('(min-width:920px)');
  const fontSize = matches ? 15 : 8;
  const margin = matches ? 5 : 0;

  const rows = data.map((row, index) => {
    return {...row, id: index}
  })

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
