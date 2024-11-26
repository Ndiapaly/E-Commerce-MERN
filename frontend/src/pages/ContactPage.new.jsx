import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from '@mui/icons-material';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email',
      content: 'ndiapalyndiaye0201@bintashop.com',
    },
    {
      icon: <Phone />,
      title: 'Téléphone',
      content: '+221 73 535 77 77',
    },
    {
      icon: <LocationOn />,
      title: 'Adresse',
      content: 'Dakar/Keur Massar, Boulevard Ainoumady',
    },
  ];

  const socialMedia = [
    { icon: <Facebook />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <Twitter />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <Instagram />, name: 'Instagram', url: 'https://instagram.com' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      user_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'ndiapalyndiaye0201@gmail.com',
    };

    try {
      await emailjs.send(
        'service_mw3hx1a',
        'template_fht9sf8',
        templateParams,
        '96rI7VgT-4t4uympl'
      );

      setSnackbar({
        open: true,
        message: 'Message envoyé avec succès !',
        severity: 'success',
      });

      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contactez-nous
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour
            toute question ou suggestion.
          </Typography>

          <Stack spacing={3} sx={{ mt: 4 }}>
            {contactInfo.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {info.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {info.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Suivez-nous
            </Typography>
            <Stack direction="row" spacing={2}>
              {socialMedia.map((social, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  startIcon={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </Button>
              ))}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Envoyez-nous un message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prénom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    type="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Sujet"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Envoyer le message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;
