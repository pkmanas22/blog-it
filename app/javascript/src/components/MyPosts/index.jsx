import React from "react";

import { PageHeader, PageLoader } from "components/common";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPostsApi";
import useQueryParams from "hooks/useQueryParams";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import NoPost from "./NoPost";
import MyPostTable from "./Table";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./Table/constant";

const MyPosts = () => {
  const { t } = useTranslation();

  const queryParams = useQueryParams();
  const { page } = queryParams;

  const postParams = {
    ...queryParams,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { posts = [], totalPostsCount } = {}, isLoading } =
    useFetchMyPosts(postParams);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(posts)) {
    return <NoPost />;
  }

  return (
    <div className="h-full space-y-4 pl-12 pt-12">
      <PageHeader label={t("myPosts.header")} />
      <MyPostTable {...{ posts, totalPostsCount }} />
    </div>
  );
};

export default MyPosts;
