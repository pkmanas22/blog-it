import React from "react";

import useQueryParams from "hooks/useQueryParams";
import { NoData, Table, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";

import COLUMN_DATA from "./ColumnData";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constant";

const Content = ({ totalPostsCount, handlePageNavigation, posts = [] }) => {
  const { page } = useQueryParams();
  const { t } = useTranslation();

  if (isEmpty(posts)) {
    return (
      <div className="flex w-full items-center justify-center">
        <NoData
          image="https://cdn-icons-png.flaticon.com/512/15/15457.png"
          title={t("noData.blog.title")}
          primaryButtonProps={{
            label: t("noData.blog.button"),
            to: routes.posts.create,
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Typography style="h3" weight="semibold">
        {t("myPosts.postCount", { count: totalPostsCount })}
      </Typography>
      <div className="w-11/12">
        <Table
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

export default Content;
