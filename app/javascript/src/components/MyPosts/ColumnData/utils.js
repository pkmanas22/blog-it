import { createElement } from "react";

import formatDateWithFallback from "utils/formatDateWithFallback";

import Actions from "./Actions";
import Title from "./Title";

export const renderTitle = (label, { slug }) =>
  createElement(Title, { label, slug });

export const renderFormattedDate = date => formatDateWithFallback(date, "PPpp");

export const renderActions = (_, { status, slug, title }) =>
  createElement(Actions, { status, slug, title });
