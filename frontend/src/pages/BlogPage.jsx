import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Chip,
} from '@mui/material';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: "Les sneakers les plus populaires de 2024",
      excerpt: "Retrouvez notre sélection des sneakers qui ont marqué le début de l'année 2024.",
      image: "/images/blog/sneakers-2024.jpg",
      date: "1 Jan 2024",
      category: "Sneakers",
    },
    {
      id: 2,
      title: "Guide des tailles pour vos achats en ligne",
      excerpt: "Comment choisir la bonne taille lors de vos achats en ligne ? Découvrez nos conseils pour ne plus vous tromper.",
      image: "/images/blog/size-guide.jpg",
      date: "15 Dec 2023",
      category: "Guide",
    },
    {
      id: 3,
      title: "Les tendances mode printemps-été 2024",
      excerpt: "Découvrez les tendances qui vont marquer la saison printemps-été 2024. Des couleurs aux coupes, on vous dit tout !",
      image: "/images/blog/trends-2024.jpg",
      date: "20 Dec 2023",
      category: "Tendances",
    },
    {
      id: 4,
      title: "Les tendances chaussures printemps-été 2024",
      excerpt: "Découvrez les dernières tendances en matière de chaussures pour la saison printemps-été 2024.",
      content: "Les tendances chaussures pour le printemps-été 2024 sont variées et excitantes. Cette saison met en avant les couleurs vives et les designs audacieux. Les sandales plates à lanières font leur grand retour, accompagnées de détails métalliques et de finitions artisanales. Les sneakers continuent d'évoluer avec des semelles plateformes et des combinaisons de matériaux innovantes. Les mules et les sabots reviennent également sur le devant de la scène, proposés dans des versions modernes et confortables. Les tons pastel et naturels dominent la palette de couleurs, avec une attention particulière pour les verts sage, les beiges et les roses poudré.",
      image: "/images/blog/spring-summer-2024.jpg",
      date: "15 Jan 2024",
      category: "Tendances",
    },
    {
      id: 5,
      title: "Comment choisir ses chaussures de running",
      excerpt: "Guide complet pour choisir les meilleures chaussures de running adaptées à votre pratique.",
      content: "Choisir les bonnes chaussures de running est essentiel pour votre confort et vos performances. Commencez par analyser votre type de foulée : neutre, pronatrice ou supinatrice. Prenez en compte votre niveau de pratique et le type de terrain sur lequel vous courez. La pointure est cruciale : prévoyez un demi-point de plus que votre pointure habituelle. Testez plusieurs modèles et marques avant de faire votre choix final. N'oubliez pas de renouveler vos chaussures tous les 800 à 1000 kilomètres.",
      image: "/images/blog/running-shoes.jpg",
      date: "10 Jan 2024",
      category: "Guide",
    },
    {
      id: 6,
      title: "Entretenir ses chaussures en cuir",
      excerpt: "Conseils et astuces pour prendre soin de vos chaussures en cuir et les faire durer plus longtemps.",
      content: "L'entretien régulier de vos chaussures en cuir est essentiel pour leur longévité. Commencez par les nettoyer avec un chiffon doux après chaque utilisation. Utilisez un cirage adapté à la couleur du cuir tous les mois. Protégez-les de l'humidité avec un spray imperméabilisant. Utilisez des embauchoirs en bois pour maintenir leur forme. En cas de pluie, laissez-les sécher naturellement loin d'une source de chaleur.",
      image: "/images/blog/leather-care.jpg",
      date: "5 Jan 2024",
      category: "Conseils",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Notre Blog
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
      >
        Découvrez nos derniers articles, conseils et actualités mode
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {posts.map((post) => (
          <Grid item xs={12} md={4} key={post.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={post.category}
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
