import React from "react";

import { PageHeader, PageLoader } from "components/common";
import { useFetchMyPosts } from "hooks/reactQuery/usePostsApi";
import { Table, Typography } from "neetoui";
import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import COLUMNS from "./ColumnData";

const MyBlogs = () => {
  const { t } = useTranslation();

  const { data: { posts = [], totalPostsCount } = {}, isLoading } =
    useFetchMyPosts();

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

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-full space-y-4 pl-12 pt-12">
      <PageHeader label={t("blogTable.header")} />
      <Typography style="h3" weight="semibold">
        {t("blogTable.blogCount", { count: totalPostsCount })}
      </Typography>
      <div className="w-11/12">
        <Table
          rowSelection
          bordered={false}
          columnData={COLUMNS}
          loading={isLoading}
          rowData={formattedRowData}
          totalCount={totalPostsCount}
        />
      </div>
    </div>
  );
};

export default MyBlogs;
