import React from "react";

import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Table as NeetoUITable, NoData } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../constant";
import { filteredColumns } from "../utils";

const Table = ({ checkedColumns, totalPostsCount, posts = [] }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const queryParams = useQueryParams();
  const { page } = queryParams;

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.myPosts, filterNonNull(mergeLeft({ page }, queryParams)))
    );

  if (isEmpty(posts)) {
    return (
      <NoData
        className="flex h-2/3 w-full flex-1 flex-col text-center"
        title={t("noData.post.title")}
      />
    );
  }

  return (
    <div className="w-11/12">
      <NeetoUITable
        rowSelection
        bordered={false}
        columnData={filteredColumns(checkedColumns)}
        currentPageNumber={Number(page) || DEFAULT_PAGE_INDEX}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        handlePageChange={handlePageNavigation}
        rowData={posts}
        tableLayout="fixed"
        totalCount={totalPostsCount}
        scroll={{
          y: 350,
        }}
      />
    </div>
  );
};

export default Table;
