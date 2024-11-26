import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Payment from '@mui/icons-material/Payment';
import Autorenew from '@mui/icons-material/Autorenew';
import Security from '@mui/icons-material/Security';
import Support from '@mui/icons-material/Support';

const FaqPage = () => {
  const faqs = [
    {
      question: 'Quels sont les délais de livraison ?',
      answer:
        "Nous livrons en France métropolitaine sous 48h ouvrées. Pour les DOM-TOM et l'international, comptez 5 à 10 jours ouvrés.",
      icon: <LocalShipping />,
    },
    {
      question: 'Quels sont les moyens de paiement acceptés ?',
      answer:
        "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et le paiement en plusieurs fois avec Klarna.",
      icon: <Payment />,
    },
    {
      question: 'Quelle est la politique de retour ?',
      answer:
        "Vous disposez de 30 jours pour retourner votre article. Le retour est gratuit en point relais.",
      icon: <Autorenew />,
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer:
        "Nous utilisons le protocole SSL pour sécuriser vos données. Vos informations ne sont jamais partagées avec des tiers.",
      icon: <Security />,
    },
    {
      question: 'Comment contacter le service client ?',
      answer:
        "Notre service client est disponible du lundi au vendredi de 9h à 18h par téléphone, email ou chat.",
      icon: <Support />,
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Foire Aux Questions
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Retrouvez les réponses aux questions les plus fréquentes
      </Typography>

      <Box sx={{ mt: 4 }}>
        {faqs.map((faq, index) => (
          <Paper 
            elevation={1} 
            sx={{ mb: 2, overflow: 'hidden' }}
            key={index}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&.Mui-expanded': {
                    minHeight: 64,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {faq.icon}
                  </Box>
                  <Typography variant="h6">
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default FaqPage;
