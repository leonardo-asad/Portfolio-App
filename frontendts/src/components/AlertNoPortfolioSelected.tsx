import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertNoPortfolioSelected() {
  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
      <Alert severity="info">Please, select a Portfolio or create a new one</Alert>
    </Stack>
  );
}
