import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { createSlug, datetime2YearMonthDay } from '../_lib/util';
import React from 'react';
import Image from 'next/image';
import { LINK_ARTICLES, LINK_MY_PAGE } from '../_consts/Links';
import { ImageBaseUrl } from '../_consts/Links';



export default function ArticleCard({id, title, content, writer_name, image, date, priority, isEditable}) {
  const router = useRouter();
  // const ImageBaseUrl = '/_f/articles/images/'

  const korYearMonthDay = datetime2YearMonthDay(date);
  

  const handleCardClick = () => {
    // Navigate to the target URL when the card is clicked
  
    let url;
    if (isEditable) {
      url = LINK_MY_PAGE + '/' + createSlug(title);

      // router.push(url);
      const data = {id, title, content, image, date };
      router.push({
        pathname: url,
        query: { data: JSON.stringify(data) },
      });
    } else {
      url = LINK_ARTICLES + '/' + createSlug(title);
      router.push(url);
    }
    
    console.log(url)
    
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
              <Typography variant="h4" component="div">
                {title}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {content}
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                Author: {writer_name}
              </Typography>
              {/* <Typography>
                {korYearMonthDay}
              </Typography> */}

            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
