import { QUERY_KEYS } from "constants/query";

import votesApi from "apis/votes";
import { useMutation } from "react-query";
import queryClient from "utils/queryClient";

export const useUpdateVoteToPost = slug =>
  useMutation(payload => votesApi.update(slug, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.VOTES]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });
