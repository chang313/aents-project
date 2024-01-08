import React, { FormEvent, useEffect, useState } from 'react';
import { post_article } from '../_requests/article';
import { getUser } from '../_lib/user';
import { TextField, TextareaAutosize, Button, Box, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

export default function Post() {
  // State for handling form input
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');

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
      const form = e.target as HTMLFormElement;
      form.reset();

    } else {
      console.log('blog posting failed..')
    }
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
        <form onSubmit={handleSubmit} style={{ width: 1200,margin: 'auto' }}>
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
              Submit
            </Button>
          </Box>
        </form>
    
    </>
    
  )
}