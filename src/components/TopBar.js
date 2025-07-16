import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './TopBar.css';

const TopBar = ({ BreedsList, sendBreedToParent }) => {
  const [breed, setBreed] = useState('');

  const handleChange = (event) => {
    setBreed(event.target.value);
    sendBreedToParent(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >
            <PetsIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Dog Gallery
          </Typography>

          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-standard-label'>
              Breed
            </InputLabel>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
