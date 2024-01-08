import styles from '../styles/Home.module.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import { getUser, clearUser } from '../_lib/user';
import { LINK_INDEX, LINK_MY_PAGE, LINK_POST, LINK_SIGN_IN } from '../_consts/Links';


const drawerWidth = 240;
const navItems = ['Home', 'About'];

export default function ToolBarLayout({user, setUser}) {
  const router = useRouter();

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Blog 
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          {user ? "hello "+ user.name + '!': ''}
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button onClick={() => router.push(LINK_INDEX)} key="My page" sx={{ color: '#fff' }}>
            Home
          </Button>
          <Button onClick={() => router.push(LINK_POST)} key="Post" sx={{ color: '#fff' }}>
            Post
          </Button>
          <Button onClick={() => router.push(LINK_MY_PAGE)} key="My page" sx={{ color: '#fff' }}>
            My page
          </Button>

          <Button onClick={() => {setUser(null); clearUser(); router.push(LINK_SIGN_IN);}} sx={{ color: '#fff'}}>
            {user ? 'Sign out' : 'Sign in'}
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  )
}