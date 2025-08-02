import { VOTE_OPTIONS } from "constants";

import React from "react";

import classNames from "classnames";
import { useUpdateVoteToPost } from "hooks/reactQuery/useVotesApi";
import { DownArrow, UpArrow } from "neetoicons";
import { Button, Typography } from "neetoui";

const Vote = ({ myVote, netVotes, slug }) => {
  const { mutate: updateVote } = useUpdateVoteToPost(slug);

  const isUpvote = myVote === VOTE_OPTIONS.UPVOTE;
  const isDownvote = myVote === VOTE_OPTIONS.DOWNVOTE;

  const handleUpvote = () => {
    updateVote({
      voteType: VOTE_OPTIONS.UPVOTE,
    });
  };

  const handleDownvote = () => {
    updateVote({
      voteType: VOTE_OPTIONS.DOWNVOTE,
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <Button
        className={classNames({ "text-green-600": isUpvote })}
        icon={UpArrow}
        style="text"
        onClick={handleUpvote}
      />
      <Typography component="h3" style="h3" weight="bold">
        {netVotes}
      </Typography>
      <Button
        className={classNames({ "text-red-600": isDownvote })}
        icon={DownArrow}
        style="text"
        onClick={handleDownvote}
      />
    </div>
  );
};

export default Vote;
