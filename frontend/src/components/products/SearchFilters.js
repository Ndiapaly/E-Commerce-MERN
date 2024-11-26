import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
  Grid,
} from '@mui/material';

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'newest',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (event, newValue) => {
    const newFilters = { ...filters, priceRange: newValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Rechercher"
            name="search"
            value={filters.search}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select
              name="category"
              value={filters.category}
              label="Catégorie"
              onChange={handleChange}
            >
              <MenuItem value="all">Toutes les catégories</MenuItem>
              <MenuItem value="electronics">Électronique</MenuItem>
              <MenuItem value="clothing">Vêtements</MenuItem>
              <MenuItem value="books">Livres</MenuItem>
              <MenuItem value="home">Maison</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Trier par</InputLabel>
            <Select
              name="sortBy"
              value={filters.sortBy}
              label="Trier par"
              onChange={handleChange}
            >
              <MenuItem value="newest">Plus récents</MenuItem>
              <MenuItem value="price_asc">Prix croissant</MenuItem>
              <MenuItem value="price_desc">Prix décroissant</MenuItem>
              <MenuItem value="popular">Popularité</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography gutterBottom>Prix</Typography>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">{filters.priceRange[0]}€</Typography>
            <Typography variant="caption">{filters.priceRange[1]}€</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchFilters;
