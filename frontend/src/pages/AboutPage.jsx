import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { LocalShipping, Security, Support, Payment } from '@mui/icons-material';

const AboutPage = () => {
  const features = [
    {
      icon: <LocalShipping />,
      title: 'Livraison Rapide',
      description: 'Livraison gratuite en France métropolitaine sous 48h',
    },
    {
      icon: <Security />,
      title: 'Paiement Sécurisé',
      description: 'Vos transactions sont 100% sécurisées',
    },
    {
      icon: <Support />,
      title: 'Support 24/7',
      description: 'Une équipe à votre écoute 7j/7',
    },
    {
      icon: <Payment />,
      title: 'Garantie Satisfait',
      description: 'Retours gratuits sous 30 jours',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          À Propos de BintaShop
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Votre destination mode préférée pour des chaussures de qualité
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Notre Histoire
          </Typography>
          <Typography paragraph>
            Fondée en 2024, BintaShop est née de la passion pour la mode et le
            confort. Notre mission est de proposer des chaussures de qualité à des
            prix accessibles, tout en offrant une expérience d'achat exceptionnelle.
          </Typography>
          <Typography paragraph>
            Nous collaborons avec les meilleures marques pour vous offrir une
            sélection unique de chaussures tendance et confortables. Notre équipe
            d'experts sélectionne soigneusement chaque modèle pour garantir qualité
            et style.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://i.pinimg.com/474x/d6/bf/f1/d6bff1889b5efcd655f8c73fb256cb4e.jpg"
            alt="Notre magasin"
            sx={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Pourquoi Nous Choisir
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    margin: '0 auto 16px',
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutPage;
