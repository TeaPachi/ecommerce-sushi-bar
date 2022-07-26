import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { Button, List } from '@mui/material';
import './SearchBar.css';

const SearchBar = ({products, getProductSearched}) => {

return (
    <Stack spacing={2} sx={{ width: 300 }} className="search-bar-container">
      <SearchIcon className="search-icon"/>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={products.map(p =>  p.productName)}
        renderInput={(params) => (
          <TextField className="product-search-bar"
            onChange={getProductSearched}
            onSelect={getProductSearched}
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  )
}

export default SearchBar