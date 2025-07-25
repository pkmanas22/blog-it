import React from "react";

import { NoData, Table, Typography } from "neetoui";
import { isEmpty, pluck } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";

import COLUMN_DATA from "./ColumnData";

const Content = ({ totalPosts, isLoading, posts = [] }) => {
  const { t } = useTranslation();

  const formattedRowData = posts.map(
    ({ title, slug, status, lastPublishedDate, categories }) => ({
      key: slug,
      title,
      status,
      slug,
      lastPublishedDate,
      categories: pluck("name", categories),
    })
  );

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
        {t("myPosts.postCount", { count: totalPosts })}
      </Typography>
      <div className="w-11/12">
        <Table
          rowSelection
          bordered={false}
          columnData={COLUMN_DATA}
          loading={isLoading}
          rowData={formattedRowData}
          tableLayout="auto"
          totalCount={totalPosts}
        />
      </div>
    </>
  );
};

export default Content;
