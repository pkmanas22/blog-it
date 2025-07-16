import React from "react";

import {
  PageLoader,
  PageHeader,
  CategoryTags,
  AvatarProfile,
} from "components/common";
import { format } from "date-fns";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { slug } = useParams();

  const { data: { post = {} } = {}, isLoading } = useShowPost(slug);

  const {
    title,
    description,
    categories,
    author: { name: authorName } = {},
    createdAt,
  } = post;

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-full flex-col pl-12 pt-12">
      <div>
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
      </div>
      <div className="mb-5 flex-1 overflow-y-auto py-4">
        <Typography className="w-11/12">{description}</Typography>
      </div>
    </div>
  );
};

export default Blog;
