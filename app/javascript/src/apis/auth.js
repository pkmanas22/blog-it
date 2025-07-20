import axios from "axios";

const signup = payload =>
  axios.post("/users", {
    user: payload,
  });

const login = payload =>
  axios.post("/sessions", {
    login: payload,
  });

const authApi = { signup, login };

export default authApi;
