import React from "react";

import { capitalize } from "neetocist";
import { defaultTo, join } from "ramda";

import RenderActions from "./Actions";
import RenderTitle from "./Title";

const COLUMNS = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 300,
    render: (label, { slug }) => <RenderTitle {...{ label, slug }} />,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: join(", "),
  },
  {
    title: "Last Published At",
    dataIndex: "lastPublished",
    key: "lastPublished",
    render: defaultTo("---"),
  },
  {
    title: "Status",
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
