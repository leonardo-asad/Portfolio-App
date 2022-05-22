import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import Button from '@mui/material/Button';

const columns = [
  {
    field: 'task',
    headerClassName: 'super-app-theme--header',
    headerName: 'Task',
    flex: 1,
    cellClassName: 'super-app-theme--cell',
  },
  {
    field: 'ticker',
    headerClassName: 'super-app-theme--header',
    headerName: 'Ticker',
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
    field: 'enabled',
    headerClassName: 'super-app-theme--header',
    headerName: 'Enabled',
    flex: 1,
    cellClassName: (params) => {
      if (params.value === '') {
        return '';
      }

      return clsx('super-app', {
        disabled: params.value === false,
        enabled: params.value === true,
      });
    },
  },
  {
    field: 'price',
    headerClassName: 'super-app-theme--header',
    headerName: 'Price',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },

  {
    field: 'threshold',
    headerClassName: 'super-app-theme--header',
    headerName: 'Threshold',
    flex: 1,
    type: 'number',
    cellClassName: 'super-app-theme--cell',
  },
];

function createRow(task_object) {
  const id = task_object.pk;
  const task = task_object.task;
  const ticker = task_object.symbol;
  const price = task_object.price;
  const type = task_object.type;
  const threshold = task_object.threshold;
  const enabled = task_object.enabled;

  return { id, task, ticker, price, type, threshold, enabled };
}

export default function AlertsGrid(props) {

  let rows = props.tasks.map((task) => createRow(task));

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          m: 5,
          boxShadow: 3,
          borderRadius: 3,
          '& .super-app-theme--header': {
            backgroundColor: "primary.main",
            color: 'white'
          },
          '& .super-app-theme--cell': {
            fontWeight: '700',
            fontSize: 15,
          },
          '& .super-app.disabled': {
            color: '#f44336',
            fontWeight: '700',
            fontSize: 15,
          },
          '& .super-app.enabled': {
            color: '#4caf50',
            fontWeight: '700',
            fontSize: 15,
          },
        }}
      >
        <DataGrid
          rows={rows} columns={columns}
          hideFooterPagination
          autoHeight
          selectionModel={props.selectedAlert}
          onSelectionModelChange={(newSelectedAlert) => {
            props.handleSelectedAlert(newSelectedAlert)
          }}
        />
      </Box>
      {
        (props.selectedAlert.length > 0) &&
          <Button
          variant="outlined"
          color="error"
          onClick={props.handleDeleteAlert}
          >
            Delete
          </Button>
      }
    </React.Fragment>
  );
}
