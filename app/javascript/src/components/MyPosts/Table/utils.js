import { filterBy } from "neetocist";

import COLUMN_DATA from "./ColumnData";

export const filteredColumns = checkedColumns =>
  filterBy(({ key, title }) => !title || checkedColumns[key], COLUMN_DATA);

export const columnKeys = COLUMN_DATA.filter(col => col.title);
