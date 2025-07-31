import axios from "axios";

const fetchMyPosts = params =>
  axios.get("/my_posts", {
    params,
  });

const bulkUpdatePostStatus = payload =>
  axios.patch("/my_posts/bulk_update_status", {
    bulk: payload,
  });

const bulkUpdatePostDestroy = payload =>
  axios.delete("/my_posts/bulk_destroy", {
    data: { bulk: payload },
  });

const myPostsApi = {
  fetchMyPosts,
  bulkUpdatePostStatus,
  bulkUpdatePostDestroy,
};

export default myPostsApi;
