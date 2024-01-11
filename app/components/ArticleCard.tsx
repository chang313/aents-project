import { Container, Typography, Card, CardContent, CardMedia, Grid, CardActionArea } from '@mui/material';
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

      const data = {id, title, content, image, date, writer_name };
      router.push({
        pathname: url,
        query: { data: JSON.stringify(data) },
      });
    }
    
    console.log(url)
    
  };

  return (
    <Container style={{padding:'5px'}}>
      <Card onClick={handleCardClick} sx={{ cursor: 'pointer', width: 1200, height: 400, margin: '10px', borderRadius: 2, }}>
        <CardActionArea>
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
          {/* <Grid item xs={12} sm={6} spacing={3} style={{  display: 'flex', flexDirection: 'column', height: '100%' }}> */}
            {/* <CardContent > */}
              <Grid container item xs={12} sm={6}  style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', padding:'20px'}} >
                <Grid item >
                  <Typography variant="h4" component="div">
                    {title}
                  </Typography>
                </Grid>
              
                <Grid item  >
                  <Typography variant="body1" color="text.secondary">
                    Author : {writer_name}
                  </Typography>
        
                  <Typography variant='body3'>
                    Updated : {korYearMonthDay}
                  </Typography>
                </Grid>

              </Grid>
              
              

            {/* </CardContent> */}
          </Grid>
        {/* </Grid> */}
        </CardActionArea>
      </Card>
    </Container>
  );
};
