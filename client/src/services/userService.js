import axios from "../utils/api/axiosConfig";
import setHeader from "../utils/api/headerConfig";

const USER_URL = "/users";

class UserService {
  getCurrentUser() {
    return axios.get(`${USER_URL}/current`, setHeader());
  }

  getUser(userId) {
    return axios.get(`${USER_URL}/${userId}`, setHeader());
  }

  updateUser(userId, data, isMultipart) {
    return axios.put(
      `${USER_URL}/${userId}/profile`,
      data,
      setHeader(isMultipart)
    );
  }

  updateUserPassword(userId, data) {
    return axios.put(`${USER_URL}/${userId}/password`, data, setHeader());
  }

  deleteUser(userId) {
    return axios.delete(`${USER_URL}/${userId}`, setHeader());
  }

  getArticlesFromUser(userId) {
    return axios.get(`${USER_URL}/${userId}/articles`, setHeader());
  }
}

export default new UserService();
