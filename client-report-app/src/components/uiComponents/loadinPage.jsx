import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <Stack sx={{
      color: 'grey.500',
      width: '100%',
      height: 150,
      alignItems: 'center',
      justifyContent: 'center'
    }}
      spacing={3}
      direction="row"
    >
      <CircularProgress color="inherit" size="5rem" />
    </Stack>
  );
}