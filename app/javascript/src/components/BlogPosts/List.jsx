import React from "react";

import { NoData } from "@bigbinary/neetoui";

import Card from "./Card";

import { useFetchPosts } from "../../hooks/reactQuery/usePostsApi";
import { PageLoader } from "../common";

const List = () => {
  const { data: { posts = [] } = {}, isLoading } = useFetchPosts();

  if (isLoading) {
    return <PageLoader />;
  }

  if (posts.length === 0) {
    return (
      <NoData className="mt-40 w-full text-center" title="No posts to show" />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <Card key={post?.id} {...post} />
      ))}
    </div>
  );
};

export default List;
