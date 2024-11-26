import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  LocalShippingTwoTone as ExpressShippingIcon,
} from '@mui/icons-material';
import {
  updateQuantity,
  removeFromCart,
  updateSize,
  setShippingMethod,
  clearCart,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  selectShippingMethod,
  selectShippingCosts,
  selectFinalAmount,
} from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Utiliser les sélecteurs Redux
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);
  const shippingMethod = useSelector(selectShippingMethod);
  const shippingCosts = useSelector(selectShippingCosts);
  const finalAmount = useSelector(selectFinalAmount);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleQuantityChange = (name, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch(updateQuantity({ name, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (name) => {
    dispatch(removeFromCart(name));
    setSnackbarMessage('Article retiré du panier');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const handleSizeChange = (name, size) => {
    dispatch(updateSize({ name, size }));
  };

  const handleShippingMethodChange = (event) => {
    dispatch(setShippingMethod(event.target.value));
  };

  const validateCart = () => {
    // Vérifier que tous les articles ont une taille sélectionnée
    const missingSize = items.find(item => !item.selectedSize);
    if (missingSize) {
      setSnackbarMessage('Veuillez sélectionner une taille pour tous les articles');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleCheckout = () => {
    if (!validateCart()) return;
    setOpenDialog(true);
  };

  const handleConfirmOrder = async () => {
    if (!email) {
      setSnackbarMessage('Veuillez entrer votre email');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    try {
      const orderDetails = {
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize
        })),
        totalAmount,
        shippingMethod,
        shippingCost: shippingCosts[shippingMethod],
        customerEmail: email,
        finalAmount
      };

      // Simuler l'envoi de la commande (à remplacer par un vrai appel API)
      console.log('Commande envoyée:', orderDetails);
      
      setSnackbarMessage('Commande confirmée ! Un email de confirmation a été envoyé.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      dispatch(clearCart());
      setOpenDialog(false);
      
    } catch (error) {
      console.error('Erreur:', error);
      setSnackbarMessage('Erreur lors de la validation de la commande');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <ShoppingBagIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Votre panier est vide
          </Typography>
          <Typography color="text.secondary" paragraph>
            Découvrez notre collection et trouvez les chaussures parfaites pour vous !
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            size="large"
          >
            Découvrir nos produits
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panier ({totalQuantity} {totalQuantity > 1 ? 'articles' : 'article'})
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={`${item.name}-${item.selectedSize}`} sx={{ mb: 2, position: 'relative' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'cover', borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.description}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleRemoveItem(item.name)}
                        color="error"
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Taille</InputLabel>
                            <Select
                              value={item.selectedSize || ''}
                              label="Taille"
                              onChange={(e) => handleSizeChange(item.name, e.target.value)}
                            >
                              {item.sizes?.map((size) => (
                                <MenuItem key={size} value={size}>
                                  {size}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              size="small"
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
                              inputProps={{ min: 1, max: 10 }}
                              sx={{ width: '60px' }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="h6" color="primary">
                        {(item.price * item.quantity).toFixed(2)} €
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Résumé de la commande
            </Typography>

            <Box sx={{ my: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Mode de livraison</InputLabel>
                <Select
                  value={shippingMethod}
                  onChange={handleShippingMethodChange}
                  label="Mode de livraison"
                >
                  <MenuItem value="standard">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon sx={{ mr: 1 }} />
                      <Box>
                        <Typography>Standard (3-5 jours)</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {shippingCosts.standard} €
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="express">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ExpressShippingIcon sx={{ mr: 1 }} />
                      <Box>
                        <Typography>Express (1-2 jours)</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {shippingCosts.express} €
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Sous-total</Typography>
                <Typography>{totalAmount.toFixed(2)} €</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Frais de livraison</Typography>
                <Typography>{shippingCosts[shippingMethod]} €</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  {finalAmount.toFixed(2)} €
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Passer la commande
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Finaliser votre commande</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Pour confirmer votre commande, veuillez entrer votre adresse email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirmOrder} variant="contained" color="primary">
            Confirmer la commande
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;
