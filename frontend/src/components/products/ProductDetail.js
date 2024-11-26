import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import axios from '../../api/axios';
import { addToCart } from '../../features/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Erreur lors du chargement du produit');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Produit non trouvé</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <Grid container spacing={4} sx={{ p: 4 }}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating || 0} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.numReviews || 0} avis)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price} €
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Disponibilité:{' '}
                <span style={{ color: product.countInStock > 0 ? 'green' : 'red' }}>
                  {product.countInStock > 0 ? 'En stock' : 'Rupture de stock'}
                </span>
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              fullWidth
              sx={{ mt: 2 }}
            >
              Ajouter au panier
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
