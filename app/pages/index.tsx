import styles from '../styles/Home.module.css';

import DrawerAppBar from './main';

function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <DrawerAppBar />
        <p>page index.tsx</p>

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
