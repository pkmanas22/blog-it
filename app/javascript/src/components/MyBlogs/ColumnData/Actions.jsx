import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";
import withT from "utils/withT";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
  Divider,
} = Dropdown;

const Actions = ({ t, status }) => (
  <Dropdown buttonStyle="text" icon={MenuHorizontal}>
    <Menu>
      <MenuItemButton onClick={() => {}}>
        {status === "draft" ? t("common.publish") : t("common.unpublish")}
      </MenuItemButton>
      <Divider />
      <MenuItemButton style="danger" onClick={() => {}}>
        {t("common.delete")}
      </MenuItemButton>
    </Menu>
  </Dropdown>
);

export default withT(Actions);
