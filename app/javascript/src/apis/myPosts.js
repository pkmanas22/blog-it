import axios from "axios";

const fetchMyPosts = params =>
  axios.get("/my_posts", {
    params,
  });

const myPostsApi = { fetchMyPosts };

export default myPostsApi;
