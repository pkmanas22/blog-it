import React from "react";

import { BlogCard, PageLoader } from "components/common";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const List = () => {
  const { t } = useTranslation();

  const { data: { posts = [] } = {}, isLoading } = useFetchPosts();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(posts)) {
    return (
      <NoData className="mt-40 w-full text-center" title={t("noBlogPosts")} />
    );
  }

  return (
    <div className="mb-10 flex flex-col gap-3">
      {posts.map(post => (
        <BlogCard key={post?.id} {...post} />
      ))}
    </div>
  );
};

export default List;
