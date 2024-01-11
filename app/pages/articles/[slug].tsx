import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LINK_ARTICLES, LINK_MY_PAGE } from '../_consts/Links';
import { ImageBaseUrl } from '../../_consts/Links';
import { datetime2YearMonthDay } from '../../_lib/util';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [writerNmae, setWriterName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const router = useRouter();
  console.log('router.query:', router.query.data);

  const jsonStrData = router.query.data;
  let parsedData;
  if (jsonStrData) {
    parsedData = JSON.parse(jsonStrData);
    console.log('parsedData:', parsedData)

  }
  
  const uploadedImage = useRef(null)
  const articleId = useRef('');

  useEffect(() => {
    if (parsedData) {
      setTitle(parsedData.title);
      setContent(parsedData.content);
      setWriterName(parsedData.writer_name);
      const korDate = datetime2YearMonthDay(parsedData.date)
      setDate(korDate);
      setImage(parsedData.image)
      // uploadedImage.current = parsedData.image;
      // articleId.current = parsedData.id;
    }
    
  }, [])

  return (
    <Container>
      <Typography variant='h2' >
        {title}
      </Typography>
      <Card sx={{ width: 1200, height: 400, margin: '10px', borderRadius: 2, }}>
        <Grid container style={{padding:'10px'}}>
          {/* Image on the left */}
          <Grid item xs={12} sm={6} >
            {image ? 
            <Image 
              src={ImageBaseUrl+image} 
              alt="Uploaded Image"
              width={600}
              height={400}
              priority={true}/>
            : 
            <CardMedia
              component="img"
              height="400"
              image="/no_image.jpg"
              alt="Image"
            />}
          </Grid>
          {/* Title on the right */}
          {/* <Grid item xs={12} sm={6}> */}
            {/* <CardContent> */}
              <Grid container item xs={12} sm={6} style={{  padding: '20px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <Grid item >
                  {/* <Typography variant="h4" component="div">
                    {title}
                  </Typography> */}
                  <Typography variant="h5" component="div">
                    {content}
                  </Typography>
                </Grid>
 
                
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Author: {writerNmae}
                  </Typography>
                  <Typography>
                    {date}
                  </Typography>

                </Grid>
                
              </Grid>

            {/* </CardContent> */}
          {/* </Grid> */}
        </Grid>
      </Card>
    </Container>

  )
}