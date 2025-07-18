import React from "react";

import CategorySidebar from "components/CategorySidebar";
import { PageHeader } from "components/common";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Button, Pagination } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";
import buildUrl from "utils/buildUrl";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import List from "./List";

const BlogLists = () => {
  const queryParams = useQueryParams();
  const { page } = queryParams;

  const { t } = useTranslation();

  const history = useHistory();

  const isCategorySidebarOpen = useCategoriesStore(
    state => state.isCategorySidebarOpen
  );

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
        routes.blogs.index,
        filterNonNull(mergeLeft({ page }, queryParams))
      )
    );

  return (
    <div className="flex h-full w-full overflow-hidden">
      {isCategorySidebarOpen && <CategorySidebar />}
      <div className="flex h-full flex-1 flex-col bg-white">
        <div className="py-12 pl-8 pr-8">
          <PageHeader label={t("blogPosts")}>
            <Link to={routes.blogs.create}>
              <Button label={t("addNewBlog")} />
            </Link>
          </PageHeader>
        </div>
        <div className="flex-1 overflow-y-auto px-8">
          <List isLoading={isLoading} posts={posts} />
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

export default BlogLists;
