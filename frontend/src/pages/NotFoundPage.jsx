import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '8rem' },
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Page Non Trouvée
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: '600px' }}
        >
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
