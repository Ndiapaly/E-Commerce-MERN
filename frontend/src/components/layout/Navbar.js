import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { text: 'Accueil', path: '/' },
    { text: 'Homme', path: '/men' },
    { text: 'Femme', path: '/women' },
    { text: 'Enfants', path: '/kids' },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const renderMobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: '250px',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleMobileMenuToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            BintaShop
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: { sm: 1, md: 2 } }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    color: 'text.primary',
                    fontSize: { sm: '0.875rem', md: '1rem' },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ color: 'text.primary' }}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ color: 'text.primary' }}
            >
              <Person />
            </IconButton>

            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleMobileMenuToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={() => {
                handleProfileMenuClose();
                navigate('/profile');
              }}
            >
              Mon Profil
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleProfileMenuClose();
                navigate('/orders');
              }}
            >
              Mes Commandes
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
      {renderMobileMenu}
    </AppBar>
  );
};

export default Navbar;
