import axios from "axios";

const signup = payload =>
  axios.post("/users", {
    user: payload,
  });

const login = payload =>
  axios.post("/sessions", {
    login: payload,
  });

const logout = () => axios.delete("/sessions");

const authApi = { signup, login, logout };

export default authApi;
