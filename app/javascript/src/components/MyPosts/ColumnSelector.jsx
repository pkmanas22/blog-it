import React from "react";

import { Checkbox, Dropdown } from "neetoui";
import withT from "utils/withT";

import { columnKeys } from "./utils";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const ColumnSelector = ({ t, checkedColumns, setCheckedColumns }) => (
  <Dropdown
    buttonStyle="secondary"
    closeOnSelect={false}
    label={t("common.column")}
  >
    <Menu>
      {columnKeys.map(({ key, title }) => (
        <MenuItemButton key={key}>
          <Checkbox
            checked={checkedColumns[key]}
            disabled={key === "title"}
            label={title}
            onChange={({ target: { checked } }) =>
              setCheckedColumns(prev => ({
                ...prev,
                [key]: checked,
              }))
            }
          />
        </MenuItemButton>
      ))}
    </Menu>
  </Dropdown>
);

export default withT(ColumnSelector);
