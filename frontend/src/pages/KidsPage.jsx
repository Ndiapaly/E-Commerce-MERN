import React, { useState } from 'react';
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
  Rating,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { kidsProducts } from '../data/products';
import { addToCart } from '../features/cartSlice';

const KidsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ageCategory, setAgeCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      setSnackbar({
        open: true,
        message: 'Veuillez sélectionner une taille',
        severity: 'error'
      });
      return;
    }

    dispatch(addToCart({
      product,
      selectedSize,
      quantity: 1
    }));

    setSnackbar({
      open: true,
      message: 'Produit ajouté au panier',
      severity: 'success'
    });
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const handleAgeChange = (event, newValue) => {
    setAgeCategory(newValue);
  };

  const filteredProducts = ageCategory === 'all'
    ? kidsProducts
    : kidsProducts.filter(product => product.ageCategory === ageCategory);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Collection Enfants
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Des vêtements confortables et stylés pour vos enfants
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={ageCategory}
          onChange={handleAgeChange}
          centered
        >
          <Tab label="Tous les âges" value="all" />
          <Tab label="Bébé (0-24 mois)" value="baby" />
          <Tab label="Enfant (2-6 ans)" value="toddler" />
          <Tab label="Junior (7-14 ans)" value="junior" />
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary">
                    {product.price} €
                  </Typography>
                  <Chip 
                    size="small" 
                    label={product.ageCategory} 
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Taille</InputLabel>
                  <Select
                    value={selectedSizes[product.id] || ''}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    label="Taille"
                  >
                    {product.sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
        {filteredProducts.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center">
              Aucun produit trouvé dans cette catégorie
            </Typography>
          </Grid>
        )}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default KidsPage;
