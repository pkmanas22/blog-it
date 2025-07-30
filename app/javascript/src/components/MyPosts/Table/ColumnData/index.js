import { t } from "i18next";
import { capitalize } from "neetocist";
import { join, map, pipe, pluck } from "ramda";

import { renderActions, renderFormattedDate, renderTitle } from "./utils";

const COLUMN_DATA = [
  {
    title: t("myPosts.columns.title"),
    dataIndex: "title",
    key: "title",
    render: renderTitle,
    width: 400,
  },
  {
    title: t("myPosts.columns.category"),
    dataIndex: "categories",
    key: "categories",
    width: 300,
    render: pipe(pluck("name"), map(capitalize), join(", ")),
  },
  {
    title: t("myPosts.columns.lastPublished"),
    dataIndex: "lastPublishedDate",
    key: "lastPublishedDate",
    render: renderFormattedDate,
  },
  {
    title: t("myPosts.columns.status"),
    dataIndex: "status",
    key: "status",
    render: capitalize,
    width: 100,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: renderActions,
    width: 50,
  },
];

export default COLUMN_DATA;
