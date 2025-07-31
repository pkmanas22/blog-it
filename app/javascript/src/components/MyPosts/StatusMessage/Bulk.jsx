import React from "react";

import { Delete } from "neetoicons";
import { Button, Dropdown, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const Bulk = ({ selectedRowIds, totalPostsCount }) => {
  const { t } = useTranslation();

  const handleBulkDraft = () => {
    alert("draft");
  };

  const handleBulkPublish = () => {
    alert("published");
  };

  const handleBulkDelete = () => {
    alert("Deleted");
  };

  return (
    <div className="flex items-center gap-2">
      <Typography>
        <Trans
          components={{ bold: <strong /> }}
          i18nKey="myPosts.postSelectedCount"
          values={{ count: selectedRowIds.length, totalPostsCount }}
        />
      </Typography>
      <Dropdown buttonStyle="secondary" label={t("myPosts.changeStatus")}>
        <Menu>
          <MenuItemButton onClick={handleBulkDraft}>
            {t("common.draft")}
          </MenuItemButton>
          <MenuItemButton onClick={handleBulkPublish}>
            {t("common.publish")}
          </MenuItemButton>
        </Menu>
      </Dropdown>
      <Button
        icon={Delete}
        iconPosition="right"
        label={t("common.delete")}
        style="danger-text"
        onClick={handleBulkDelete}
      />
    </div>
  );
};

export default Bulk;
