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
import ToolBarLayout from '../components/ToolBar';

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
    if (pageProps.protected) {
      const user = getUser();
      if (user === null) router.push(LINK_SIGN_IN);
      else setUser(user);
    }
  }, [pageProps.protected, router]);


  const FilteredComponent = () => {
    console.log('router.pathname:', router.pathname, router.query);
    if (ALLOWED_PAGES.some((path) => router.pathname.startsWith(path))) // change it allows all path that has substring 
      return (
      
        <Layout user={user} setUser={setUser} handleMyPageClick={handleMyPageClick}>
          <Component {...pageProps} />
        </Layout>
    
          
      )
    if (!user) return <Backdrop open />;
    return (
      <Layout user={user} setUser={setUser} handleMyPageClick={handleMyPageClick}>
        <Component {...pageProps} />
      </Layout>
        
    );
  };

  const handleMyPageClick = () => {
    console.log('handleMyPageClick start')
    // select 해서 넘어가기
    
    const articleData = pageProps.data;
    console.log('pageProps.data:', articleData)
    const passingProp = {articles: articleData };
    router.push({
      pathname: LINK_MY_PAGE,
      query: passingProp,
    })
  }

  return (
    <>
      <PageHead />
      <FilteredComponent />
    </>
  );
}
