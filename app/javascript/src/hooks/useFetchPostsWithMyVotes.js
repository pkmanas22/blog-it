import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
} from "components/Post/constants";
import { assoc, indexBy, map, pipe, prop } from "ramda";

import { useFetchPosts } from "./reactQuery/usePostsApi";
import { useFetchMyVotes } from "./reactQuery/useVotesApi";
import useQueryParams from "./useQueryParams";

const useFetchPostsWithMyVotes = () => {
  const queryParams = useQueryParams();
  const { page } = queryParams;

  const postParams = {
    ...queryParams,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const {
    data: { posts: allPosts = [], totalPostsCount } = {},
    isLoading: isPostsLoading,
  } = useFetchPosts(postParams);

  const { data: myVotes = [], isLoading: isVotesLoading } = useFetchMyVotes();

  const isLoading = isVotesLoading || isPostsLoading;

  const votesMap = pipe(
    indexBy(prop("postId")),
    map(prop("voteType"))
  )(myVotes);

  const posts = map(post => assoc("myVote", votesMap[post.id], post), allPosts);

  return {
    isLoading,
    posts,
    totalPostsCount,
  };
};

export default useFetchPostsWithMyVotes;
