import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { selectSearchStockResult } from '../features/stock/stockSlice';

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
  const searchStockResult = useSelector(selectSearchStockResult);
  const matches = useMediaQuery('(min-width:920px)');
  const fontSize = matches ? 15 : 8;
  const margin = matches ? 5 : 0;

  const rows = searchStockResult.map((row, index) => {
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
