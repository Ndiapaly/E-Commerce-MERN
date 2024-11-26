import React from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Button } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mon Profil
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              defaultValue="John"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              defaultValue="Doe"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="john.doe@example.com"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Téléphone"
              defaultValue="+33 1 23 45 67 89"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Adresse"
              defaultValue="123 Rue du Commerce"
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" color="primary">
                Annuler
              </Button>
              <Button variant="contained" color="primary">
                Sauvegarder
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
