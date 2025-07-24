import React from "react";

import { t } from "i18next";
import { capitalize } from "neetocist";

import RenderActions from "./Actions";
import RenderTitle from "./Title";
import { formatCategories, formatPublishedDate } from "./utils";

const COLUMNS = [
  {
    title: t("blogTable.columns.title"),
    dataIndex: "title",
    key: "title",
    render: (label, { slug }) => <RenderTitle {...{ label, slug }} />,
  },
  {
    title: t("blogTable.columns.category"),
    dataIndex: "categories",
    key: "categories",
    width: 300,
    render: formatCategories,
  },
  {
    title: t("blogTable.columns.lastPublished"),
    dataIndex: "lastPublishedDate",
    key: "lastPublishedDate",
    render: formatPublishedDate,
  },
  {
    title: t("blogTable.columns.status"),
    dataIndex: "status",
    key: "status",
    render: capitalize,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (_, { status, slug }) => <RenderActions {...{ status, slug }} />,
    width: 50,
  },
];

export default COLUMNS;
