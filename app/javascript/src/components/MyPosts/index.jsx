import React from "react";

import { PageHeader, PageLoader } from "components/common";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPostsApi";
import { useTranslation } from "react-i18next";

import Content from "./Content";

const MyPosts = () => {
  const { t } = useTranslation();

  const { data: { posts = [], totalPostsCount: totalPosts } = {}, isLoading } =
    useFetchMyPosts();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-full space-y-4 pl-12 pt-12">
      <PageHeader label={t("myPosts.header")} />
      <Content {...{ posts, totalPosts }} />
    </div>
  );
};

export default MyPosts;
