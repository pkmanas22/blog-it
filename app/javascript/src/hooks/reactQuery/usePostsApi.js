import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

export const useFetchPosts = ({ category, page, pageSize }) =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, category, page, pageSize],
    queryFn: () => postsApi.fetch({ category, page, pageSize }),
  });

export const useCreatePost = () =>
  useMutation(postsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
    },
  });

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
    select: prop("post"),
  });

export const useEditPost = slug =>
  useMutation(payload => postsApi.edit(slug, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.POSTS);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS, slug]);
    },
  });
