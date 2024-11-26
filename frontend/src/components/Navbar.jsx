import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { selectCartTotalQuantity } from '../features/cartSlice';

const Navbar = () => {
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            BintaShop
          </Typography>

          <Box>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/cart"
              sx={{ position: 'relative' }}
            >
              <Badge
                badgeContent={totalQuantity}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -3,
                    top: 3,
                    border: '2px solid currentColor',
                    padding: '0 4px',
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
