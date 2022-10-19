import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dispatch, SetStateAction } from 'react';

interface SetTimeProps {
  label?: string;
  callback: Dispatch<SetStateAction<Date>>;
  date: Date;
}

export default function SetTime({label, callback, date}: SetTimeProps) {

  const handleChange = (newValue: Date | null) => {
    newValue && callback(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <TimePicker
          label={label}
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
