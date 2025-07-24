import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
  Divider,
} = Dropdown;

const Actions = ({ status }) => (
  <Dropdown buttonStyle="text" icon={MenuHorizontal}>
    <Menu>
      <MenuItemButton onClick={() => {}}>
        {status === "draft" ? "Publish" : "Unpublish"}
      </MenuItemButton>
      <Divider />
      <MenuItemButton style="danger" onClick={() => {}}>
        Delete
      </MenuItemButton>
    </Menu>
  </Dropdown>
);

export default Actions;
