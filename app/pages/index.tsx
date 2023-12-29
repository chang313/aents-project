import { Button } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { getUser, clearUser } from '../_lib/user';
import { LINK_INDEX, LINK_SIGN_IN } from '../_consts/Links';

function Home() {
  const [user] = useState<any>(getUser);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Button onClick={() => clearUser() && router.push(LINK_SIGN_IN)}>
          {user ? 'Sign out' : 'Sign in'}
        </Button>
      </main>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Home;
