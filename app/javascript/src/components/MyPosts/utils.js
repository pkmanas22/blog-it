import { filterBy } from "neetocist";
import { compose, includes, is, map, prop, toLower, without } from "ramda";

import COLUMN_DATA from "./Table/ColumnData";

export const filteredColumns = checkedColumns =>
  filterBy(({ key, title }) => !title || checkedColumns[key], COLUMN_DATA);

export const columnKeys = COLUMN_DATA.filter(col => col.title);

export const getCategoryNames = (categories = []) =>
  map(compose(toLower, prop("label")), categories);

export const getCategoryParams = category =>
  is(Array, category) ? category : [category];

export const getSelectedCategories = (category, categoryOptions) =>
  filterBy(
    ({ label }) => includes(toLower(label), getCategoryParams(category)),
    categoryOptions
  );

export const getUpdatedParams = ({ key, value, queryParams }) => {
  const updatedParams = { ...queryParams };

  if (key === "title") updatedParams.title = null;

  if (key === "status") updatedParams.status = null;

  if (key === "category") {
    const filteredCategories = without(
      [value],
      getCategoryParams(queryParams?.category)
    );
    updatedParams.category = filteredCategories;
  }

  return updatedParams;
};
