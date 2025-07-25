import React from "react";

import classNames from "classnames";
import { Check } from "neetoicons";
import { ActionDropdown } from "neetoui";

const {
  MenuItem: { Button: MenuItemButton },
} = ActionDropdown;

const ItemButton = ({ label, isActive, handleClick }) => (
  <MenuItemButton
    disabled={isActive}
    prefix={isActive && <Check size={20} />}
    className={classNames({
      "cursor-not-allowed text-gray-500": isActive,
    })}
    onClick={handleClick}
  >
    {label}
  </MenuItemButton>
);

export default ItemButton;
