import React from "react";

import { PageLoader, PageHeader } from "components/common";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { slug } = useParams();

  const { data: { post = {} } = {}, isLoading } = useShowPost(slug);

  const { title, description } = post;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-full py-12 pl-12">
      <PageHeader label={title} />
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto py-4">
          <Typography className="mb-16 w-11/12">{description}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Blog;
