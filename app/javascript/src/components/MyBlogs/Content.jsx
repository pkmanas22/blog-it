import React from "react";

import { NoData, Table, Typography } from "neetoui";
import { pluck } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";

import COLUMNS from "./ColumnData";

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

  if (!totalPosts) {
    return (
      <NoData
        className="mt-7 h-72 w-full text-center"
        title={t("blogTable.noPosts")}
        secondaryButtonProps={{
          label: t("blog.addNew"),
          to: routes.blogs.create,
        }}
      />
    );
  }

  return (
    <>
      <Typography style="h3" weight="semibold">
        {t("blogTable.blogCount", { count: totalPosts })}
      </Typography>
      <div className="w-11/12">
        <Table
          rowSelection
          bordered={false}
          columnData={COLUMNS}
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
