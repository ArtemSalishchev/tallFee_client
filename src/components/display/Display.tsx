import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
interface DisplayProps {
    fee: number
}

export default function Display({fee}: DisplayProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        {fee}
      </Typography>
    </Box>
  );
}
