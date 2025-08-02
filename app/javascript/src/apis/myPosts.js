import axios from "axios";

const fetchMyPosts = params =>
  axios.get("/me/posts", {
    params,
  });

const bulkUpdatePostStatus = payload =>
  axios.patch("/me/posts/bulk_update_status", {
    bulk: payload,
  });

const bulkUpdatePostDestroy = payload =>
  axios.delete("/me/posts/bulk_destroy", {
    data: { bulk: payload },
  });

const myPostsApi = {
  fetchMyPosts,
  bulkUpdatePostStatus,
  bulkUpdatePostDestroy,
};

export default myPostsApi;
