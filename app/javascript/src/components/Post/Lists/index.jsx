import React from "react";

import CategorySidebar from "components/CategorySidebar";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Pagination } from "neetoui";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";
import buildUrl from "utils/buildUrl";

import Contents from "./Contents";
import Header from "./Header";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../constants";

const Lists = () => {
  const queryParams = useQueryParams();
  const { page } = queryParams;

  const history = useHistory();

  const isCategorySidebarOpen = useCategoriesStore.pickFrom();

  const postParams = {
    ...queryParams,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { posts = [], totalPostsCount } = {}, isLoading } =
    useFetchPosts(postParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.posts.index,
        filterNonNull(mergeLeft({ page }, queryParams))
      )
    );

  return (
    <div className="flex h-full w-full overflow-hidden">
      {isCategorySidebarOpen && <CategorySidebar />}
      <div className="flex h-full flex-1 flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto px-8">
          <Contents {...{ isLoading, posts }} />
        </div>
        <div className="flex justify-end p-4">
          <Pagination
            count={totalPostsCount}
            navigate={handlePageNavigation}
            pageNo={postParams.page}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
};

export default Lists;
