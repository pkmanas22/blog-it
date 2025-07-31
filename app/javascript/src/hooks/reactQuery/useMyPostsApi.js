import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useQuery } from "react-query";

export const useFetchMyPosts = ({ page, pageSize, title, category, status }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS, page, pageSize, title, category, status],
    queryFn: () =>
      myPostsApi.fetchMyPosts({ page, pageSize, title, category, status }),
    keepPreviousData: true,
  });
