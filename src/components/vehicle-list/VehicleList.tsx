import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useCallback } from 'react';

interface VehicleListProps {
  list: Record<string, string>;
  callback: React.Dispatch<React.SetStateAction<string>>;
  selectedVehicle: string;
}

export default function VehicleList({list, callback, selectedVehicle}: VehicleListProps) {

  const memorizedCallback = useCallback(
    (value: string) => {
      callback(value)
    },
    [],
  )
  

  const handleChange = (event: SelectChangeEvent) => {
    memorizedCallback(event.target.value as string);
  };

  return (
    <Box sx={{ width: '100%' }} >
      <FormControl fullWidth>
        <InputLabel id="vehicle-list">Vehicle Type</InputLabel>
        <Select
          labelId="vehicle-list"
          id="vehicle-list"
          value={selectedVehicle}
          label="vehicleType"
          onChange={handleChange}
        >
            {Object.values(list).map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}