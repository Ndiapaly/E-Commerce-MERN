import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

const OrdersPage = () => {
  const orders = [
    {
      id: '#12345',
      date: '2024-01-15',
      status: 'Livré',
      total: '149.99',
      items: 3,
    },
    {
      id: '#12346',
      date: '2024-01-10',
      status: 'En cours',
      total: '89.99',
      items: 2,
    },
    {
      id: '#12347',
      date: '2024-01-05',
      status: 'Livré',
      total: '199.99',
      items: 4,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Livré':
        return 'success';
      case 'En cours':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mes Commandes
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro de commande</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Articles</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.total} €</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrdersPage;
