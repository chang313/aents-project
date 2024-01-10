import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { post_article, update_article } from '../../_requests/article';
import { getUser } from '../../_lib/user';
import { TextField, TextareaAutosize, Button, Box, Input, CardMedia, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { ImageBaseUrl } from '../../_consts/Links';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function EditablePage() {
  // State for handling form input
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageStr, setSelectedImageStr] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploadedImgShow, setUploadedImgShow] = useState(true);

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
      uploadedImage.current = parsedData.image;
      articleId.current = parsedData.id;
    }
    
  }, [])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();  

    console.log('typeof selectedImage', typeof selectedImage)
    console.log('selectedImage', selectedImage)
    console.log('parameter types:', typeof articleId.current, typeof title, typeof content);
   
    const response = await update_article({article_id: articleId.current, title, content, image: selectedImage});
    if (response.success) {
      console.log('blog updating success!');
      setTitle('');
      setContent('');
      setSelectedImage(null);
      setImageName('');
     
      // Reset the form to clear the file input
      const form = e.target as HTMLFormElement;
      form.reset();

    } else {
      console.log('blog updating failed..')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Assuming it's a single file input
    const selectedFile = e.target.files?.[0];
    setSelectedImage(selectedFile);
    console.log('selectedFile:', selectedFile);
    if (selectedFile) {
      const fileName = selectedFile.name;
      console.log('selected filename: ',fileName)
      setImageName(fileName);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageStr(reader.result);
      };

      reader.readAsDataURL(selectedFile);

    } else {
      console.log('nos file is selected!!!')
      setImageName('');
      setSelectedImageStr('');
    }

  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setSelectedImageStr('');
    setImageName('');
    setUploadedImgShow(false);
  }

  // const handleRestoreImage = 


  return (
    <>
        <h1>You can edit your article</h1>
        <Grid item xs={12} sm={6}>
          {selectedImage &&
            <Image src={selectedImageStr} alt="Selected Image" width={300} height={200} /> 
          }

          {(!selectedImage && uploadedImage.current && uploadedImgShow) &&
            <Image 
              src={ImageBaseUrl+uploadedImage.current} 
              alt="Uploaded Image"
              width={300}
              height={200}
              priority={true}
            /> 
          } 
          {(!selectedImage && (!uploadedImage.current || (uploadedImage.current && !uploadedImgShow))) &&
            <Image 
              src="/no_image.jpg"
              height={200}
              width={300}
              alt="NO IMAGE"
            />
           }
          <Button onClick={handleDeleteImage} variant="contained" color="primary" > Delete</Button>
         
        </Grid>
        
        
        <form onSubmit={handleSubmit} style={{ width: 1200, margin: 'auto' }}>
          <Box marginBottom={2}>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box marginBottom={2}>
            <TextareaAutosize
              minRows={10}
              placeholder="Content"
              style={{ width: '100%', padding: '8px', resize: 'none' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          <Box display="flex" marginBottom={2}>
            <Button size="small" component="label" variant="contained" startIcon={<CloudUploadIcon />} >
              Upload file
              <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile"
                onChange={handleImageChange} />
              <VisuallyHiddenInput type="file" />
            </Button>
            <p style={{ marginLeft: '8px', marginBottom: '0' }}>{imageName}</p>
    
          </Box>
          <Box>
            <Button type="submit" variant="contained" color="primary" >
              Update
            </Button>
          </Box>
        </form>
    
    </>
    
  )
}