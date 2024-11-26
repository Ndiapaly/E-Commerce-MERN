import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const TermsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Conditions Générales de Vente
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
          1. Objet
        </Typography>
        <Typography paragraph>
          Les présentes Conditions Générales de Vente (CGV) régissent les ventes
          de chaussures et accessoires réalisées par BintaShop auprès de ses
          clients. Toute commande implique l'acceptation sans réserve des
          présentes CGV.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          2. Prix et Paiement
        </Typography>
        <Typography paragraph>
          Les prix sont indiqués en euros TTC. BintaShop se réserve le droit de
          modifier ses prix à tout moment. Les produits seront facturés sur la
          base des tarifs en vigueur au moment de la validation de la commande.
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          2.1 Modalités de paiement
        </Typography>
        <Typography paragraph>
          Nous acceptons les moyens de paiement suivants :
        </Typography>
        <ul>
          <li>
            <Typography>Cartes bancaires (Visa, Mastercard)</Typography>
          </li>
          <li>
            <Typography>PayPal</Typography>
          </li>
          <li>
            <Typography>Paiement en 3 ou 4 fois sans frais (Klarna)</Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          3. Livraison
        </Typography>
        <Typography paragraph>
          BintaShop s'engage à livrer les produits dans les délais suivants :
        </Typography>
        <ul>
          <li>
            <Typography>
              Sénégal: 48h ouvrées
            </Typography>
          </li>
          <li>
            <Typography>
              DOM-TOM et international : 5 à 10 jours ouvrés
            </Typography>
          </li>
        </ul>
        <Typography paragraph>
          Les frais de livraison sont offerts à partir de 15000fcfa d'achat .
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          4. Droit de Rétractation
        </Typography>
        <Typography paragraph>
          Conformément à la législation en vigueur, vous disposez d'un délai de
          14 jours à compter de la réception de votre commande pour exercer votre
          droit de rétractation. Les frais de retour sont à votre charge.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          5. Garanties
        </Typography>
        <Typography paragraph>
          Tous nos produits bénéficient de la garantie légale de conformité et
          de la garantie contre les vices cachés. En cas de défaut de conformité,
          vous pouvez choisir entre la réparation ou le remplacement du produit.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          6. Protection des Données
        </Typography>
        <Typography paragraph>
          Les informations collectées lors de votre commande sont nécessaires au
          traitement de celle-ci. Elles font l'objet d'un traitement informatique
          et sont destinées à BintaShop. Conformément à la loi "Informatique et
          Libertés" et au RGPD, vous disposez d'un droit d'accès, de
          rectification et d'opposition aux données vous concernant.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          7. Litiges
        </Typography>
        <Typography paragraph>
          En cas de litige, une solution amiable sera recherchée avant toute
          action judiciaire. À défaut, les tribunaux français seront seuls
          compétents.
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

export default TermsPage;
