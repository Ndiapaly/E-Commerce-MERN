import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { addToCart } from '../features/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSnackbarMessage('Veuillez sélectionner une taille');
      setOpenSnackbar(true);
      return;
    }

    dispatch(addToCart({
      product,
      selectedSize,
      quantity
    }));

    setSnackbarMessage(`${quantity} ${quantity > 1 ? 'articles ajoutés' : 'article ajouté'} au panier`);
    setOpenSnackbar(true);
    setQuantity(1);
    setSelectedSize('');
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {product.price.toFixed(2)} €
        </Typography>

        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Taille</InputLabel>
            <Select
              value={selectedSize}
              label="Taille"
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              inputProps={{ min: 1, max: 10 }}
              sx={{ width: '60px' }}
            />
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </Button>
        </Box>
      </CardContent>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={selectedSize ? 'success' : 'warning'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProductCard;
