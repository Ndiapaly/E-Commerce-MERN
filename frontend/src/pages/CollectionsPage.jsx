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
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { AddShoppingCart, LocalOffer, Style } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collections } from '../data/products';
import { addToCart } from '../features/cartSlice';

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (collection) => {
    dispatch(addToCart({
      ...collection,
      isCollection: true,
    }));
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Nos Collections
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Découvrez nos collections exclusives et limitées
      </Typography>

      <Grid container spacing={4}>
        {collections.map((collection) => (
          <Grid item key={collection.id} xs={12} md={6}>
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
              {collection.isLimited && (
                <Chip
                  icon={<Style />}
                  label="Édition Limitée"
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1
                  }}
                />
              )}
              {collection.discount > 0 && (
                <Chip
                  icon={<LocalOffer />}
                  label={`-${collection.discount}%`}
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1
                  }}
                />
              )}
              <CardMedia
                component="img"
                height="400"
                image={collection.image}
                alt={collection.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/collection/${collection.id}`)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {collection.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {collection.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Articles inclus:
                </Typography>
                <List dense>
                  {collection.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={item.name}
                        secondary={`${item.description} - Taille: ${item.size}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <Typography variant="h5" color="primary">
                    {collection.price} €
                  </Typography>
                  {collection.discount > 0 && (
                    <Typography
                      variant="body1"
                      sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                    >
                      {(collection.price * (100 + collection.discount) / 100).toFixed(2)} €
                    </Typography>
                  )}
                  <Chip
                    label={`${collection.items.length} articles`}
                    color="primary"
                    variant="outlined"
                    sx={{ ml: 'auto' }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddShoppingCart />}
                  onClick={() => handleAddToCart(collection)}
                  disabled={!collection.available}
                  size="large"
                >
                  {collection.available ? 'Ajouter la collection au panier' : 'Collection épuisée'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {collections.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center">
              Aucune collection disponible pour le moment
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CollectionsPage;
