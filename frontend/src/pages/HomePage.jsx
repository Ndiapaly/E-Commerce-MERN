import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Collection Homme',
      image: 'https://i.pinimg.com/474x/50/2b/13/502b134c232eba88df92765494b5f0c9.jpg',
      path: '/men',
      description: 'Découvrez notre collection exclusive pour hommes'
    },
    {
      title: 'Collection Femme',
      image: 'https://i.pinimg.com/474x/2d/b1/8e/2db18ebbf4c2147cde89b1865bcc3ac0.jpg',
      path: '/women',
      description: 'Des styles élégants pour toutes les occasions'
    },
    {
      title: 'Collection Enfants',
      image: 'https://i.pinimg.com/474x/f4/ef/0b/f4ef0b27ebb3ed9a9ec615c4675d39b4.jpg',
      path: '/kids',
      description: 'Des chaussures confortables pour les petits'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
          >
            BintaShop
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Découvrez notre collection de chaussures tendance
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Voir la collection
          </Button>
        </Box>

        {/* Categories Section */}
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
                onClick={() => navigate(category.path)}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={category.image}
                  alt={category.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Nos Meilleures Ventes
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item key={item} xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="250"
                    image={`https://via.placeholder.com/300x250?text=Produit+${item}`}
                    alt={`Produit ${item}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      Produit {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      99.99 €
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
