import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery } from "react-query";

export const useFetchPosts = () =>
  useQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: () => postsApi.fetch(),
  });

export const useCreatePost = () => useMutation(postsApi.create);
