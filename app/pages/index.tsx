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
import { LINK_INDEX, LINK_SIGN_IN } from '../_consts/Links';
import Page from '../components/ArticleCardList';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios';
import { getAllArticle } from '../_requests/article';

type Article = {
  _id: string
  title: string
  content: string
  date_time: Date
  writer_name: string,
  image: null
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  data: Array<Article>;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'My articles'];

function Home(props: Props) {
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const { window, data } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log('fetched data:', data);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setUser(getUser);
  }, [])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar component="nav">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
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
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: '#fff' }}>
                    {item}
                  </Button>
                ))}
                <Button onClick={() => clearUser() && router.push(LINK_SIGN_IN)} sx={{ color: '#fff'}}>
                  {user ? 'Sign out' : 'Sign in'}
                </Button>
        
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Typography>
              Main page article

            </Typography>
            <Page articles={data}/>
          </Box>
        </Box>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('start)')
  try {
    console.log('in try')
    // const res = await axios.get('http://ams-api:8000/article/all');
    const res = await getAllArticle();
    console.log('fetch done')
 
    const data = res.data;

    return {
      props: {
        protected: true,
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        protected: true,
        data: null,
      },
    };
  }
};



export default Home;
