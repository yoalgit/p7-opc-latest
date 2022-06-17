import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const ARTICLE_URL = "/articles";

class LikeService {
  sendLike(articleId, likeValue) {
    return axios.post(
      `${ARTICLE_URL}/${articleId}/likes`,
      likeValue,
      setHeader()
    );
  }

  getLike(articleId) {
    return axios.get(`${ARTICLE_URL}/${articleId}/likes`, setHeader());
  }
}

export default new LikeService();
