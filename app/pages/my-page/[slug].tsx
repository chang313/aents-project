import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { deleteArticle, post_article, update_article } from '../../_requests/article';
import { getUser } from '../../_lib/user';
import { TextField, TextareaAutosize, Button, Box, Input, CardMedia, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { ImageBaseUrl } from '../../_consts/Links';
import AlertDialog from '../../components/Dialog';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dialogTitle = "정말 업데이트 하시곘습니까?"
  const dialogContent = "'네'를 누르시면, 복구할 수 없습니다"
  const button1Text = "네"
  const button2Text = "아니오"

  const deleteDialogTitle = "정말 글을 삭제하시곘습니까?"


  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  }



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

  const handleSubmitClick = () => {
    setDialogOpen(true)
  }

  const handleDelSubmitClick = () => {
    setDeleteDialogOpen(true);
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();  

    console.log('typeof selectedImage', typeof selectedImage)
    console.log('selectedImage', selectedImage)
    console.log('parameter types:', typeof articleId.current, typeof title, typeof content);

    const isImageChange = !(!selectedImage && uploadedImage && uploadedImgShow);

   
    const response = await update_article({article_id: articleId.current, title, content, image: selectedImage, isImageChange});
    if (response.success) {
      console.log('blog updating success!');
      setTitle('');
      setContent('');
      setSelectedImage(null);
      setImageName('');
      uploadedImage.current = null;
     
      // Reset the form to clear the file input
      // const form = e.target as HTMLFormElement;
      // console.log('form:', form)
      // form.reset();

    } else {
      console.log('blog updating failed..')
    }

    setDialogOpen(false);
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

  const handleInitializeImage = () => {
    setSelectedImage(null);
    setSelectedImageStr('');
    setImageName('');
    setUploadedImgShow(true);
  }

  const handleDelete = async () => {
    const response = await deleteArticle(articleId.current);

    if (response.success) {
      console.log('article delete success!');
      setTitle('');
      setContent('');
      setSelectedImage(null);
      setImageName('');
      uploadedImage.current = null;

    } else {
      console.log('article delete failed..')
    }

    setDeleteDialogOpen(false);
  }


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
          <Button onClick={handleInitializeImage} variant="contained" color="primary" >Initialize</Button>
         
        </Grid>
        
        
        <form  style={{ width: 1200, margin: 'auto' }}>
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
              <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile" accept="image/*"
                onChange={handleImageChange} />
              <VisuallyHiddenInput type="file" />
            </Button>
            <p style={{ marginLeft: '8px', marginBottom: '0' }}>{imageName}</p>
    
          </Box>
          <Box>
            <Button onClick={handleSubmitClick} type="button" variant="contained" color="primary" >
              Update
            </Button>
          </Box>
        </form>
        <Button onClick={handleDelSubmitClick} type="button" variant='outlined' color="warning"> 
          Delete article
        </Button>
        <AlertDialog 
          handleSubmit={handleSubmit}
          open={dialogOpen}
          handleClose={handleClose}
          dialogTitle={dialogTitle}
          dialogContent={dialogContent} 
          button1Text={button1Text} 
          button2Text={button2Text}>
        </AlertDialog>
        <AlertDialog 
          handleSubmit={handleDelete}
          open={deleteDialogOpen}
          handleClose={handleDeleteClose}
          dialogTitle={deleteDialogTitle}
          dialogContent={dialogContent} 
          button1Text={button1Text} 
          button2Text={button2Text}>
        </AlertDialog>
    
    </>
    
  )
}