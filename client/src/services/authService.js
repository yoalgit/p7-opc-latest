import axios from "../utils/api/axiosConfig";

const SIGNUP_URL = "/auth/signup";
const LOGIN_URL = "/auth/login";

class AuthService {
  register(data) {
    return axios.post(SIGNUP_URL, data);
  }

  login(data) {
    return axios.post(LOGIN_URL, data);
  }
}

export default new AuthService();
