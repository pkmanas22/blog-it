import React from "react";

import { PageHeader } from "components/common";
import { Table, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import COLUMNS from "./ColumnData";

const ROW_DATA = [
  {
    key: 1,
    title: "How to build scalable React applications with best practices",
    category: ["React", "JavaScript", "Frontend"],
    lastPublished: undefined,
    status: "draft",
    slug: "build-scalable-react-apps",
  },
  {
    key: 2,
    title: "Understanding Ruby on Rails Action Cable for real-time features",
    category: ["Ruby", "Rails", "Websockets"],
    lastPublished: "2025-06-15 10:00",
    status: "published",
    slug: "ruby-action-cable-realtime",
  },
  {
    key: 3,
    title: "Introduction to TypeScript: Types and Interfaces explained",
    category: ["TypeScript", "JavaScript", "Programming"],
    lastPublished: "2025-07-18 12:45",
    status: "published",
    slug: "typescript-intro-types-interfaces",
  },
  {
    key: 4,
    title: "Writing effective unit tests with Jest for React components",
    category: ["Testing", "Jest", "React"],
    lastPublished: "2025-07-22 08:20",
    status: "draft",
    slug: "unit-tests-react-jest",
  },
];

const MyBlogs = () => {
  const { t } = useTranslation();

  return (
    <div className="h-full space-y-4 pl-12 pt-12">
      <PageHeader label={t("blogTable.header")} />
      <Typography style="h3" weight="semibold">
        {t("blogTable.blogCount", { count: ROW_DATA.length })}
      </Typography>
      <div className="w-11/12">
        <Table
          rowSelection
          columnData={COLUMNS}
          currentPageNumber={1}
          defaultPageSize={10}
          rowData={ROW_DATA}
        />
      </div>
    </div>
  );
};

export default MyBlogs;
