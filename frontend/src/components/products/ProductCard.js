import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          {product.price} €
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          Voir détails
        </Button>
        <Button 
          size="small" 
          color="primary" 
          startIcon={<AddShoppingCart />}
        >
          Ajouter au panier
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
