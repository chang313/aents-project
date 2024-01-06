import { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios';
import Article from './ArticleCard';


type Article = {
  _id: string
  title: string
  content: string
  date_time: Date
  writer_name: string,
  image: null
}

export default function Page({ articles }) {
  console.log(articles);

  if (!articles) {
    // Handle loading state, or return an appropriate message
    return <div>Loading...</div>;
  }

  return (
    <main>
      {articles.map((article) => (
        <Article key={article._id} id={article._id} title={article.title} content={article.content} writer_name={article.writer_name}/>
      ))}
    </main>
  );
}

