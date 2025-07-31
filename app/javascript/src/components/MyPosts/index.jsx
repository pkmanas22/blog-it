import React, { useState } from "react";

import { PageHeader, PageLoader } from "components/common";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPostsApi";
import useQueryParams from "hooks/useQueryParams";
import { useTranslation } from "react-i18next";

import ColumnSelector from "./ColumnSelector";
import {
  DEFAULT_CHECKED_COLUMNS,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "./constant";
import FilterPane from "./FilterPane";
import Message from "./Message";
import MyPostTable from "./Table";

const MyPosts = () => {
  const [checkedColumns, setCheckedColumns] = useState(DEFAULT_CHECKED_COLUMNS);

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

  return (
    <div className="h-full space-y-4 pl-12 pt-12">
      <PageHeader label={t("myPosts.header")} />
      <div className="flex w-11/12 items-center justify-between">
        <Message {...{ totalPostsCount }} />
        <div className="flex items-center gap-3">
          <ColumnSelector {...{ checkedColumns, setCheckedColumns }} />
          <FilterPane />
        </div>
      </div>
      <MyPostTable {...{ checkedColumns, posts, totalPostsCount }} />
    </div>
  );
};

export default MyPosts;
