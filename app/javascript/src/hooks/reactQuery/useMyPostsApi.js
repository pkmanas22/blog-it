import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useQuery } from "react-query";

export const useFetchMyPosts = () =>
  useQuery({
    queryKey: QUERY_KEYS.MY_POSTS,
    queryFn: () => postsApi.fetchMyPosts(),
  });
