import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

export const useFetchMyPosts = ({ page, pageSize, title, category, status }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS, page, pageSize, title, category, status],
    queryFn: () =>
      myPostsApi.fetchMyPosts({ page, pageSize, title, category, status }),
    keepPreviousData: true,
  });

export const useBulkUpdatePostStatus = () =>
  useMutation(payload => myPostsApi.bulkUpdatePostStatus(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries(QUERY_KEYS.MY_POSTS);
    },
  });

export const useBulkDestroyPost = () =>
  useMutation(payload => myPostsApi.bulkUpdatePostDestroy(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries(QUERY_KEYS.MY_POSTS);
    },
  });
