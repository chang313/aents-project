import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { getUser } from '../_lib/user';
import { useRouter } from 'next/router';
import { LINK_SIGN_IN, ALLOWED_PAGES, LINK_MY_PAGE } from '../_consts/Links';
import { Backdrop } from '@mui/material';
import Layout from '../components/Layout';

const PageHead = () => (
  <Head>
    <title>{'Aents Standalone Template'}</title>
    <meta name='description' content='Generated by create next app' />
    <link rel='icon' href='/favicon.ico' />
  </Head>
);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    console.log('pageProps.protected:', pageProps.protected)
    if (pageProps.protected) {
      const user = getUser();
      if (user === null) {
        router.push(LINK_SIGN_IN);
        console.log('tried to route somewhere. but no user info. ')
      } else setUser(user);
      
    }
  }, [pageProps.protected, router]);


  const FilteredComponent = () => {
    console.log('router.pathname:', router.pathname, router.query);
    if (ALLOWED_PAGES.some((path) => router.pathname.startsWith(path))) // change it allows all path that has substring 
      return (
      
        // <Layout user={user} setUser={setUser} handleMyPageClick={handleMyPageClick}>
        <Layout user={user} setUser={setUser} >
        
          <Component {...pageProps} />
        </Layout>
    
          
      )
    if (!user) return <Backdrop open />;
    return (
      // <Layout user={user} setUser={setUser} handleMyPageClick={handleMyPageClick}>
      <Layout user={user} setUser={setUser} >
        <Component {...pageProps} />
      </Layout>
        
    );
  };

  return (
    <>
      <PageHead />
      <FilteredComponent />
    
    </>
  );
}
