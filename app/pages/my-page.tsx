import React, { useEffect, useState } from "react";
import ArticleCardList from "../components/ArticleCardList";
import { useRouter } from "next/router";
import { useData } from "../components/DataConext";
import { GetServerSideProps } from "next";
import { getMyArticle } from "../_requests/article";
import { Article } from "../_lib/util";
import { getUser } from "../_lib/user";

export default function MyPage() {
  const [myArticle, setMyArticle] = useState<Array<Article>>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('start in my-page data fetching');
      try {
        console.log('in try');
        const userSession = getUser();
        const username = userSession.name;
        const res = await getMyArticle(username);
        console.log('fetch done');

        const fetchedData = res.data;
        setMyArticle(fetchedData);

      } catch (error) {
        console.error('Error fetching data:', error.message);
        setMyArticle([]);
      }
    };

    fetchData();
    
  }, []);

  return (
    <>
      <p> this is my page</p>
      <ArticleCardList articles={myArticle} isEditable={true}/>
    </>
    
  )  

}



