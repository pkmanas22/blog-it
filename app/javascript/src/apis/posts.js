import axios from "axios";

const fetch = params =>
  axios.get("/posts", {
    params,
  });

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const show = slug => axios.get(`/posts/${slug}`);

const edit = (slug, payload) =>
  axios.patch(`/posts/${slug}`, {
    post: payload,
  });

const postsApi = { fetch, create, show, edit };

export default postsApi;
