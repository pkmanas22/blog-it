import React, { useState } from "react";

import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Typography, Table as NeetoUITable } from "neetoui";
import { mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

import ColumnSelector from "./ColumnSelector";
import {
  DEFAULT_CHECKED_COLUMNS,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "./constant";
import FilterPane from "./FilterPane";
import { filteredColumns } from "./utils";

const Table = ({ totalPostsCount, posts = [] }) => {
  const [checkedColumns, setCheckedColumns] = useState(DEFAULT_CHECKED_COLUMNS);

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
      <div className="flex w-11/12 items-center justify-between">
        <Typography style="h3" weight="semibold">
          {t("myPosts.postCount", { count: totalPostsCount })}
        </Typography>
        <div className="flex items-center gap-3">
          <ColumnSelector {...{ checkedColumns, setCheckedColumns }} />
          <FilterPane />
        </div>
      </div>
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
    </>
  );
};

export default Table;
