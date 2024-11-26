import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { menProducts } from '../data/products';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../components/common/OptimizedImage';

const MenPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [selectedSizes, setSelectedSizes] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      setSnackbarMessage('Veuillez sélectionner une taille');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    dispatch(addToCart({
      product,
      selectedSize,
      quantity: 1
    }));
    setSnackbarMessage('Produit ajouté au panier');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      py: { xs: 2, sm: 3, md: 4 },
      backgroundColor: theme.palette.background.default 
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 'bold',
            mb: { xs: 2, sm: 3, md: 4 }
          }}
        >
          Collection Homme
        </Typography>
        <Typography 
          variant={isMobile ? "body1" : "subtitle1"} 
          gutterBottom 
          align="center" 
          sx={{ mb: { xs: 3, sm: 4 } }}
        >
          Découvrez notre sélection de Shoes pour homme!
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {menProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  height={isMobile ? 200 : isTablet ? 250 : 300}
                  style={{ borderRadius: '8px 8px 0 0', cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    {product.price.toFixed(2)} €
                  </Typography>
                  <FormControl fullWidth size="small" sx={{ mt: 2 }}>
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
                <CardActions sx={{ p: 2 }}>
                  <Button 
                    fullWidth
                    variant="contained" 
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      py: 1,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Ajouter au panier
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenPage;
