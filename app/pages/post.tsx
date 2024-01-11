import React, { FormEvent, useEffect, useState } from 'react';
import { post_article } from '../_requests/article';
import { getUser } from '../_lib/user';
import { TextField, TextareaAutosize, Button, Box, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import AlertDialog from '../components/Dialog';



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

interface Props {
  protected: boolean;
}

export const getStaticProps = async () => {
  return {props: {
    protected: true
  }}
}


export default function Post(props: Props) {
  // State for handling form input
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogTitle = "정말 업로드 하시곘습니까?"
  const dialogContent = "'네'를 누르시면, 복구할 수 없습니다"
  const button1Text = "네"
  const button2Text = "아니오"

  // console.log('protected:', protect)
  console.log('protected:', props.protected)

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmitClick = () => {
    setDialogOpen(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const user = getUser();
    const writer_name = user ? user.name : null;
   
    console.log('image type:', typeof image);
    const response = await post_article({title, content, writer_name, image});
    if (response.success) {
      console.log('blog posting success!');
      setTitle('');
      setContent('');
      setImage(null);
      setImageName('');
     

      // Reset the form to clear the file input
      // const form = e.target as HTMLFormElement;
      // form.reset();

    } else {
      console.log('blog posting failed..')
    }

    setDialogOpen(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Assuming it's a single file input
    const selectedFile = e.target.files?.[0];
    setImage(selectedFile);
    if (selectedFile) {
      const fileName = selectedFile.name;
      console.log('selected filename: ',fileName)
      setImageName(fileName);
    } else {
      console.log('nos file is selected!!!')
      setImageName('');
    }

  };

  return (
    <>
      
        <h1>Post an Article</h1>
        <form style={{ width: 1200,margin: 'auto' }}>
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
            <Button onClick={handleSubmitClick} variant="contained" color="primary" >
              Submit
            </Button>
          </Box>
        </form>
        <AlertDialog
          handleSubmit={handleSubmit}
          open={dialogOpen}
          handleClose={handleClose}
          dialogTitle={dialogTitle}
          dialogContent={dialogContent} 
          button1Text={button1Text} 
          button2Text={button2Text}>
        </AlertDialog>
    
    </>
    
  )
}
