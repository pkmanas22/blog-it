import React from "react";

import { PageHeader, PageLoader } from "components/common";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPostsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constant";
import Content from "./Content";

const MyPosts = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page } = queryParams;

  const postParams = {
    ...queryParams,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { posts = [], totalPostsCount } = {}, isLoading } =
    useFetchMyPosts(postParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.myPosts, filterNonNull(mergeLeft({ page }, queryParams)))
    );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-full space-y-4 pl-12 pt-12">
      <PageHeader label={t("myPosts.header")} />
      <Content {...{ posts, totalPostsCount, handlePageNavigation }} />
    </div>
  );
};

export default MyPosts;
