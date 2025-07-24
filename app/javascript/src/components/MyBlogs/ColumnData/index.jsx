import React from "react";

import { t } from "i18next";
import { capitalize } from "neetocist";
import { defaultTo, join } from "ramda";

import RenderActions from "./Actions";
import RenderTitle from "./Title";

const COLUMNS = [
  {
    title: t("blogTable.columns.title"),
    dataIndex: "title",
    key: "title",
    width: 300,
    render: (label, { slug }) => <RenderTitle {...{ label, slug }} />,
  },
  {
    title: t("blogTable.columns.category"),
    dataIndex: "category",
    key: "category",
    render: join(", "),
  },
  {
    title: t("blogTable.columns.lastPublished"),
    dataIndex: "lastPublished",
    key: "lastPublished",
    render: defaultTo("---"),
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
    render: (_, { status }) => <RenderActions {...{ status }} />,
    width: 50,
  },
];

export default COLUMNS;
