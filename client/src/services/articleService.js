import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const ARTICLE_URL = "/articles";

class ArticleService {
  getAllArticles() {
    return axios.get(ARTICLE_URL, setHeader());
  }

  addArticle(data, isMultipart) {
    return axios.post(ARTICLE_URL, data, setHeader(isMultipart));
  }
  updateArticle(articleId, data, isMultipart) {
    return axios.put(
      `${ARTICLE_URL}/${articleId}/update`,
      data,
      setHeader(isMultipart),
    );
  }

  deleteArticle(articleId) {
    return axios.delete(`${ARTICLE_URL}/${articleId}`, setHeader());
  }
}

export default new ArticleService();
