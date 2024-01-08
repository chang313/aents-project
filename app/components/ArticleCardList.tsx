import ArticleCard from './ArticleCard';

export default function ArticleCardList({ articles }) {
  console.log(articles);

  if (!articles) {
    // Handle loading state, or return an appropriate message
    return <div>Loading...</div>;
  }

  return (
    <main>
      {articles.map((article, index) => (
        <ArticleCard 
          key={article._id} 
          id={article._id} 
          title={article.title} 
          content={article.content} 
          writer_name={article.writer_name}
          image={article.image}
          priority={index < 2}/>
      ))}
    </main>
  );
}

