import React from 'react';
import { Container, Typography, Box, Divider, Link } from '@mui/material';

const PrivacyPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Politique de Confidentialité
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        align="center"
        sx={{ mb: 6 }}
      >
        Dernière mise à jour : Janvier 2024
      </Typography>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          Chez BintaShop, nous accordons une grande importance à la protection de
          vos données personnelles. Cette politique de confidentialité explique
          comment nous collectons, utilisons et protégeons vos informations
          lorsque vous utilisez notre site web.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          2. Collecte des Données
        </Typography>
        <Typography paragraph>
          Nous collectons les informations suivantes :
        </Typography>
        <ul>
          <li>
            <Typography>
              Informations personnelles (nom, adresse, email, téléphone)
            </Typography>
          </li>
          <li>
            <Typography>
              Informations de paiement (cryptées et sécurisées)
            </Typography>
          </li>
          <li>
            <Typography>
              Historique des commandes et préférences d'achat
            </Typography>
          </li>
          <li>
            <Typography>
              Données de navigation et cookies techniques
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          3. Utilisation des Données
        </Typography>
        <Typography paragraph>
          Vos données sont utilisées pour :
        </Typography>
        <ul>
          <li>
            <Typography>Traiter vos commandes et livraisons</Typography>
          </li>
          <li>
            <Typography>
              Améliorer nos services et votre expérience d'achat
            </Typography>
          </li>
          <li>
            <Typography>
              Communiquer avec vous concernant vos commandes
            </Typography>
          </li>
          <li>
            <Typography>
              Vous envoyer des offres personnalisées (avec votre consentement)
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          4. Protection des Données
        </Typography>
        <Typography paragraph>
          Nous mettons en œuvre des mesures de sécurité appropriées pour protéger
          vos données contre tout accès, modification, divulgation ou destruction
          non autorisé. Vos données sont stockées sur des serveurs sécurisés et
          l'accès est strictement limité.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          5. Vos Droits
        </Typography>
        <Typography paragraph>
          Conformément au RGPD, vous disposez des droits suivants :
        </Typography>
        <ul>
          <li>
            <Typography>Droit d'accès à vos données</Typography>
          </li>
          <li>
            <Typography>Droit de rectification</Typography>
          </li>
          <li>
            <Typography>Droit à l'effacement</Typography>
          </li>
          <li>
            <Typography>Droit à la portabilité</Typography>
          </li>
          <li>
            <Typography>Droit d'opposition</Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          6. Contact
        </Typography>
        <Typography paragraph>
          Pour toute question concernant notre politique de confidentialité ou
          pour exercer vos droits, contactez notre délégué à la protection des
          données :
        </Typography>
        <Typography>
          Email :{' '}
          <Link href="mailto:privacy@bintashop.com">privacy@bintashop.com</Link>
        </Typography>
        <Typography>
          Adresse : Ainoumady/Keur Massar Sud, Dakar, Sénégal
        </Typography>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © 2024 BintaShop. Tous droits réservés.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPage;
