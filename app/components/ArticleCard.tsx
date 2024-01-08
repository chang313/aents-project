import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { createSlug } from '../_lib/util';
import React from 'react';
import Image from 'next/image';



export default function ArticleCard({title, content, writer_name, image, priority, isEditable}) {
  const router = useRouter();
  const ImageBaseUrl = '/_f/articles/images/'

  const handleCardClick = () => {
    // Navigate to the target URL when the card is clicked
  
    let url;
    if (isEditable) {
      url = '/my-page/' + createSlug(title);
    } else {
      url = '/articles/' + createSlug(title);
    }
    
    console.log(url)
    router.push(url);
  };

  return (
    <Container>
      <Card onClick={handleCardClick} sx={{ cursor: 'pointer', width: 1200, height: 400, margin: '10px', borderRadius: 2, }}>
        <Grid container>
          {/* Image on the left */}
          <Grid item xs={12} sm={6}>
            {image ? 
            <Image 
              src={ImageBaseUrl+image} 
              alt="Uploaded Image"
              width={600}
              height={400}
              priority={priority}/>
            : 
            <CardMedia
              component="img"
              height="400"
              image="/no_image.jpg"
              alt="Image"
            />}
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
                Author: {writer_name}
              </Typography>

            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
