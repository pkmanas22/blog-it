import { useParams } from "react-router-dom";

import { useShowPost } from "./reactQuery/usePostsApi";

const useFetchPostWithStatus = () => {
  const { slug } = useParams();

  const {
    data: post = {},
    isLoading: isPostLoading,
    error,
  } = useShowPost(slug);

  const isPostNotFound = error?.status === 404;

  return { post, isPostLoading, isPostNotFound };
};

export default useFetchPostWithStatus;
