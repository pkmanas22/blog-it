import React from "react";

import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Typography, Table as NeetoUITable } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import COLUMN_DATA from "./ColumnData";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../constant";

const Table = ({ totalPostsCount, posts = [] }) => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page } = queryParams;

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.myPosts, filterNonNull(mergeLeft({ page }, queryParams)))
    );

  return (
    <>
      <Typography style="h3" weight="semibold">
        {t("myPosts.postCount", { count: totalPostsCount })}
      </Typography>
      <div className="w-11/12">
        <NeetoUITable
          rowSelection
          bordered={false}
          columnData={COLUMN_DATA}
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
    </>
  );
};

export default Table;
