import { QUERY_KEYS } from "constants/query";

import votesApi from "apis/votes";
import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";
import queryClient from "utils/queryClient";

export const useFetchMyVotes = () =>
  useQuery({
    queryKey: [QUERY_KEYS.VOTES],
    queryFn: () => votesApi.index(),
    select: prop("votes"),
    keepPreviousData: true,
  });
export const useUpdateVoteToPost = slug =>
  useMutation(payload => votesApi.update(slug, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.VOTES]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });
