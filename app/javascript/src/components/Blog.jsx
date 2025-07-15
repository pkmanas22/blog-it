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
    <>
      <PageHeader label={title} />
      <div className="h-full overflow-y-auto">
        <Typography className="mb-10 mt-2 w-4/5">{description}</Typography>
      </div>
    </>
  );
};

export default Blog;
