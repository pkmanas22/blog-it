import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery } from "react-query";

export const useFetchPosts = ({ category }) =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, category],
    queryFn: () => postsApi.fetch({ category }),
  });

export const useCreatePost = () => useMutation(postsApi.create);

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
  });
