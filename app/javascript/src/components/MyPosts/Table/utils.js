import { filterBy } from "neetocist";
import { compose, includes, is, map, prop, toLower } from "ramda";

import COLUMN_DATA from "./ColumnData";

export const filteredColumns = checkedColumns =>
  filterBy(({ key, title }) => !title || checkedColumns[key], COLUMN_DATA);

export const columnKeys = COLUMN_DATA.filter(col => col.title);

export const getCategoryNames = (categories = []) =>
  map(compose(toLower, prop("label")), categories);

export const getSelectedCategories = (category, categoryOptions) => {
  const categoryParams = is(Array, category) ? category : [category];

  return filterBy(
    ({ label }) => includes(toLower(label), categoryParams),
    categoryOptions
  );
};
