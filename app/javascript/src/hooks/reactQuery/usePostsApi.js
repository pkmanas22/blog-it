import { useQuery } from "react-query";

import postsApi from "../../apis/posts";
import { QUERY_KEYS } from "../../constants/query";

export const useFetchPosts = () =>
  useQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: () => postsApi.fetch(),
  });
