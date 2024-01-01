import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { request_signin } from '../_requests/signin';
import { setUser } from '../_lib/user';
import { useRouter } from 'next/router';
import { LINK_INDEX } from '../_consts/Links';
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      <Link color='inherit' href='https://aentscope.com/'>
        {'Aentscope template'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Popup(props: any) {
  const {open, setOpen, message} = props;

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={action}
    />

  )
}

// const theme = createTheme();
interface LoginFormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormTarget extends React.FormEvent<HTMLFormElement> {
  target: LoginFormElements;
}

export default function SignIn() {
  const [authError, setauthError] = useState(false);
  const [authMessage, setauthMessage] = useState<string>('');
  
  const router = useRouter();

  const handleSubmit = async (e: LoginFormTarget) => {
    e.preventDefault();
    const t = e.target;
    const username = t.email.value;
    const password = t.password.value;

    const response = await request_signin({ username, password });
    if (response.success) {
      setUser(response.access_token);
      router.push(LINK_INDEX);
    } else {
      console.log(response.message);
      setauthError(true);
      setauthMessage(response.message);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* 
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
           */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      {authError && <Popup open={true} setOpen={setauthError} message={authMessage} />}
    </Container>
  );
}
