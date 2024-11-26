import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, CircularProgress, Box } from '@mui/material';
import ProductCard from './ProductCard';
import SearchFilters from './SearchFilters';
import axios from '../../api/axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'newest',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products', { params: filters });
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Nos Produits
      </Typography>
      
      <SearchFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
          {products.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center">
                Aucun produit trouvé
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;
