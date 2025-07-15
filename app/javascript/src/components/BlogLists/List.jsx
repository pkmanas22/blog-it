import React from "react";

import { PageLoader } from "components/common";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";

import Card from "./Card";

const List = () => {
  const { t } = useTranslation();

  const { data: { posts = [] } = {}, isLoading } = useFetchPosts();

  if (isLoading) {
    return <PageLoader />;
  }

  if (posts.length === 0) {
    return (
      <NoData className="mt-40 w-full text-center" title={t("noBlogPosts")} />
    );
  }

  return (
    <div className="mb-10 flex flex-col gap-3">
      {posts.map(post => (
        <Card key={post?.id} {...post} />
      ))}
    </div>
  );
};

export default List;
