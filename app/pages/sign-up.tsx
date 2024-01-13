import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Alert, Snackbar, IconButton } from '@mui/material';
import { email_exist, request_signup } from '../_requests/signin';
import CloseIcon from '@mui/icons-material/Close';

export default function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [pwError, setPwError] = useState<string>('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkConfirmPw = () => {
    if (password == confirmPassword) {
      return true;
    } else false;
  }

  const handleClose = () => {
    setOpenAlert(false);
    setAlertMessage('');
  }

  const handleSuccessClose = ()  => {
    setOpenSuccess(false);

  }

  const handleSignup = async () => {
    if (!name) { // check if name field is filled.
      setAlertMessage('Please fill the name!')
      setOpenAlert(true);
    } else if (!email) { // check if email field is filled.
      setAlertMessage('Please fill the email!')
      setOpenAlert(true);
    }  else if (!password) { // check if password field is filled.
      setAlertMessage('Please fill the password!') 
      setOpenAlert(true);
    } else if (!confirmPassword) { // check if confirm password field is filled.
      setAlertMessage('Please fill the confirm password!') 
      setOpenAlert(true);
    } else if (emailError) {
      setAlertMessage(emailError)
      setOpenAlert(true);
    } else if (pwError) {
      setAlertMessage(pwError)
      setOpenAlert(true);
    } else { // 모든 조건 통과한 경우
      console.log('Signup attempt:', { name, email, password });
      const response = await request_signup({name, email, plain_password: password})
      if (response.success) {
        setOpenSuccess(true);
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else {
        setAlertMessage('Failed to create your account.')
        setOpenAlert(true);

      }
    }
    
  };

  useEffect(() => {
    const checkDupEmail = async (email: string) => {
      console.log('email:',email)
      const response = await email_exist(email);
      console.log('checkDupEmail res:', response)
      if (response.email_exist) {
        setEmailError('Email already exists.');
      }
    }
    if (!email) {
      return
    } else if (!validateEmail(email)) {
      setEmailError('Incorrect email');
    } else {
      checkDupEmail(email);
    }

  }, [email])

  useEffect(() => {
    if (password && !checkConfirmPw()) {
      setPwError('Passwords are not matched')
    } else {
      setPwError('');
    }
  },[password, confirmPassword])

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Create your account
          </Typography>
          <form style={{ width: '100%', marginTop: 8 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
                console.log('email field input has just been changed')
              }}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setPwError('');
              }}
              error={!!pwError}
              helperText={pwError}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignup}
              style={{ marginTop: 16 }}
            >
              sign up
            </Button>
          </form>
        </Paper>
      </Container>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={handleClose}>{alertMessage}</Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert severity="success" onClose={handleSuccessClose} >Your account has been created!</Alert>
      </Snackbar>
      
    </>
  );
};


