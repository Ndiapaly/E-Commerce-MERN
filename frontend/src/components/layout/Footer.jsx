import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com' },
    { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <Instagram />, url: 'https://instagram.com' },
    { icon: <LinkedIn />, url: 'https://linkedin.com' },
  ];

  const quickLinks = [
    { text: 'À propos', path: '/about' },
    { text: 'Contact', path: '/contact' },
    { text: 'Blog', path: '/blog' },
    { text: 'FAQ', path: '/faq' },
  ];

  const categories = [
    { text: 'Homme', path: '/men' },
    { text: 'Femme', path: '/women' },
    { text: 'Enfants', path: '/kids' },
    { text: 'Nouveautés', path: '/new-arrivals' },
  ];

  const contactInfo = [
    { icon: <Email />, text: 'ndiapalyndiaye0201@bintashop.com' },
    { icon: <Phone />, text: '+221 73 535 77 77' },
    { icon: <LocationOn />, text: 'Dakar/Keur Massar, Boulevard Ainoumady' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 4, md: 6 },
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo et Description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 700,
                mb: 2,
                display: 'inline-block',
              }}
            >
              BintaShop
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Votre destination mode préférée pour des chaussures de qualité.
              Découvrez notre collection exclusive de shoes pour homme, femme et enfant.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Liens Rapides */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
              Liens Rapides
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.path}
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Catégories */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
              Catégories
            </Typography>
            <Stack spacing={1}>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={category.path}
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {category.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
              Contact
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((info, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="center">
                  <Box sx={{ color: 'text.secondary' }}>{info.icon}</Box>
                  <Typography variant="body2" color="text.secondary">
                    {info.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} BintaShop. Tous droits réservés.
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            alignItems="center"
          >
            <Link
              href="/privacy"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/terms"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Conditions d'utilisation
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
