import React, { useEffect, useState } from "react";
import ArticleCardList from "../components/ArticleCardList";
import { useRouter } from "next/router";
import { useData } from "../components/DataConext";
import { GetServerSideProps } from "next";
import { getMyArticle } from "../_requests/article";
import { Article } from "../_lib/util";
import { getUser } from "../_lib/user";

interface Props {
  protected: boolean;
}

export const getStaticProps = async () => {
  return {props: {
    protected: true
  }}
}

export default function MyPage(props: Props) {
  const [myArticle, setMyArticle] = useState<Array<Article>>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('start in my-page data fetching');
      try {
        console.log('in try');
        const userSession = getUser();
        if (userSession) {
          const username = userSession.name;
          const res = await getMyArticle(username);
          console.log('fetch done');

          const fetchedData = res.data;
          setMyArticle(fetchedData);
        }

      } catch (error) {
        console.error('Error fetching data:', error.message);
        setMyArticle([]);
      }
    };

    fetchData();
    
  }, []);

  return (
    <>
      <h1>This is My Page. </h1>
      <h3> you can select an article to edit it</h3>
      <ArticleCardList articles={myArticle} isEditable={true}/>
    </>
    
  )  

}



