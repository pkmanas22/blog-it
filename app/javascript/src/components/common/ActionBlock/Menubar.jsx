import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import withT from "utils/withT";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const Menubar = () => {
  const { t } = useTranslation();

  const handleDelete = () => {
    // TODO: get slug & delete the post
  };

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal}>
      <Menu>
        <MenuItemButton style="danger" onClick={handleDelete}>
          {t("common.delete")}
        </MenuItemButton>
      </Menu>
    </Dropdown>
  );
};

export default withT(Menubar);
