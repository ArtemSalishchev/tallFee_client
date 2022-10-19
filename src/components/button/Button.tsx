import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface ButtonProps{
  color?: string;
  text?: string;
  callback?: () => void;
  disabled?: boolean;
}

export default function BasicButtons({color, text, callback, disabled}: ButtonProps) {
  return (
    <Stack spacing={2} direction="row">
      <Button 
        variant="contained" 
        sx={{backgroundColor:`${color}`, margin: '0 20px', width: '125px'}}
        onClick={callback}
        disabled={disabled}
      >
        {text}
      </Button>
    </Stack>
  );
}