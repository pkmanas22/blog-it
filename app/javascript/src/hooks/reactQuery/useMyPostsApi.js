import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useQuery } from "react-query";

export const useFetchMyPosts = ({ page, pageSize }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS, page, pageSize],
    queryFn: () => myPostsApi.fetchMyPosts({ page, pageSize }),
    keepPreviousData: true,
  });
