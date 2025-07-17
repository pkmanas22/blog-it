import React from "react";

import { PageLoader } from "components/common";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { NoData, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import Item from "./Item";

const List = () => {
  const queryParams = useQueryParams();
  const { category = [], page } = queryParams;

  const { t } = useTranslation();

  const history = useHistory();

  const postParams = {
    category,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { posts = [], totalPostsCount } = {}, isLoading } =
    useFetchPosts(postParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.blogs.index,
        filterNonNull(mergeLeft({ page }, queryParams))
      )
    );

  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(posts)) {
    return (
      <NoData className="mt-40 w-full text-center" title={t("noBlogPosts")} />
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-1 flex-col gap-3 overflow-y-auto">
        {posts.map(post => (
          <Item key={post?.id} {...post} />
        ))}
      </div>
      <div className="m-1 flex justify-end">
        <Pagination
          count={totalPostsCount}
          navigate={handlePageNavigation}
          pageNo={postParams.page}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default List;
