import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const ARTICLE_URL = "/articles";

class CommentService {
  getAllComments(articleId) {
    return axios.get(`${ARTICLE_URL}/${articleId}/comments`, setHeader());
  }

  addComment(articleId, data) {
    return axios.post(
      `${ARTICLE_URL}/${articleId}/comments`,
      data,
      setHeader()
    );
  }

  deleteComment(articleId, commentId) {
    return axios.delete(
      `${ARTICLE_URL}/${articleId}/comments/${commentId}`,
      setHeader()
    );
  }
}

export default new CommentService();
