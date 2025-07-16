import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({ BreedsList }) {
  const [breed, setBreed] = useState('');

  const handleChange = (event) => {
    setBreed(event.target.value);
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-standard-label'>Breed</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={breed}
          onChange={handleChange}
          label='Breed'
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {BreedsList.map((breed) => (
            <MenuItem value={breed}>{breed}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
