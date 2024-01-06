import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { createSlug } from '../_lib/util';

export default function Article({title, content, writer_name}) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to the target URL when the card is clicked
  
    const url = '/articles/' + createSlug(title);
    console.log(url)
    router.push(url);
  };

  return (
    <Container>
      <Card onClick={handleCardClick} sx={{ cursor: 'pointer', width: 1200, height: 400 }}>
        <Grid container>
          {/* Image on the left */}
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              height="400"
              image="/no_image.jpg"
              alt="Image"
            />
          </Grid>
          {/* Title on the right */}
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {writer_name}
              </Typography>

            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
