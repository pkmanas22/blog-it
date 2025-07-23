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

const destroy = slug => axios.delete(`/posts/${slug}`);

const postsApi = { fetch, create, show, edit, destroy };

export default postsApi;
