import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Rating
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { womenProducts } from '../data/products';
import { addToCart } from '../features/cartSlice';

const WomenPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product,
      selectedSize: product.sizes[0], // Default to first available size
      quantity: 1
    }));
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Collection Femme
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Découvrez notre sélection de vêtements pour femme
      </Typography>

      <Grid container spacing={4}>
        {womenProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              {product.isNew && (
                <Chip
                  label="Nouveau"
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1
                  }}
                />
              )}
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Rating value={product.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({product.numReviews} avis)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" color="primary">
                    {product.price} €
                  </Typography>
                  <Chip 
                    size="small" 
                    label={product.subcategory} 
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Tailles disponibles: {product.sizes.join(', ')}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.countInStock}
                  sx={{ flex: 1, mr: 1 }}
                >
                  {product.countInStock ? 'Ajouter au panier' : 'Rupture de stock'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Favorite />}
                >
                  Favoris
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WomenPage;
