import React from "react";

import {
  PageLoader,
  PageHeader,
  CategoryTags,
  AvatarProfile,
  PageNotFound,
} from "components/common";
import { format } from "date-fns";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { slug } = useParams();

  const { data: post = {}, isLoading, error } = useShowPost(slug);

  const {
    title,
    description,
    categories,
    author: { name: authorName } = {},
    createdAt,
  } = post;

  if (isLoading) return <PageLoader />;

  if (error?.status === 404) {
    return <PageNotFound />;
  }

  return (
    <div className="flex h-full flex-col pl-12 pt-12">
      <CategoryTags {...{ categories }} />
      <PageHeader label={title} />
      <div className="flex items-center gap-3 py-2">
        <AvatarProfile />
        <div>
          <Typography style="body2" weight="semibold">
            {authorName}
          </Typography>
          <Typography style="body2">
            {format(createdAt, "dd MMMM yyyy")}
          </Typography>
        </div>
      </div>
      <Typography className="w-11/12 pb-3">{description}</Typography>
    </div>
  );
};

export default Blog;
