import { useEffect, useState } from "react";

// Services
import articleService from "../../services/articleService";
import userService from "../../services/userService";

// Components
import Article from "../../components/Home/Article";
import Loader from "../../components/Shared/Loader";

const ArticlesList = ({
  articleListEdited,
  setArticleListEdited,
  filter,
  userId,
}) => {
  const [isDataLoading, setDataLoading] = useState();
  const [error, setError] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [listEmpty, setListEmpty] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      setDataLoading(true);
      let response;
      // For the profile page, we fetch the articles from a specific user
      if (filter && filter === "byUser") {
        response = await userService.getArticlesFromUser(userId);
        // From the home pagen we fetch all the articles
      } else {
        response = await articleService.getAllArticles();
      }
      setArticlesList(response.data);
      if (response.data.length === 0) {
        setListEmpty(true);
      }
      setDataLoading(false);
    };
    // The list is refetched when the user adds a new article or visits a profile
    if (articleListEdited || filter === "byUser") {
      getArticles();
    }
    setArticleListEdited(false);
  }, [articleListEdited, userId]);

  if (error) {
    setError(error);
    return <span>{error}</span>;
  }

  return (
    <>
      {isDataLoading ? (
        <Loader />
      ) : listEmpty ? (
        <p>Aucun article pour le moment !</p>
      ) : (
        articlesList.map((article) => (
          <Article
            key={`article-${article.id}`}
            data={article}
            articleListEdited={articleListEdited}
            setArticleListEdited={setArticleListEdited}
          />
        ))
      )}
    </>
  );
};

export default ArticlesList;
