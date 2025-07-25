import React from "react";

import { t } from "i18next";
import { capitalize } from "neetocist";
import { join, map, pipe } from "ramda";
import formatDateWithFallback from "utils/formatDateWithFallback";

import RenderActions from "./Actions";
import RenderTitle from "./Title";

const COLUMNS = [
  {
    title: t("blogTable.columns.title"),
    dataIndex: "title",
    key: "title",
    render: (label, { slug }) => <RenderTitle {...{ label, slug }} />,
    width: 350,
  },
  {
    title: t("blogTable.columns.category"),
    dataIndex: "categories",
    key: "categories",
    width: 300,
    render: pipe(map(capitalize), join(", ")),
  },
  {
    title: t("blogTable.columns.lastPublished"),
    dataIndex: "lastPublishedDate",
    key: "lastPublishedDate",
    render: date => formatDateWithFallback(date, "PPpp"),
  },
  {
    title: t("blogTable.columns.status"),
    dataIndex: "status",
    key: "status",
    render: capitalize,
    width: 100,
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
