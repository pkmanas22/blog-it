import React, { useState } from "react";

import {
  useBulkDestroyPost,
  useBulkUpdatePostStatus,
} from "hooks/reactQuery/useMyPostsApi";
import { Delete } from "neetoicons";
import { Alert, Button, Dropdown, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const Bulk = ({ selectedRowIds, setSelectedRowIds, totalPostsCount }) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const { t } = useTranslation();

  const { mutate: bulkUpdateStatus } = useBulkUpdatePostStatus();
  const { mutate: bulkDestroy } = useBulkDestroyPost();

  const selectedRowCount = selectedRowIds.length;

  const handleBulkUpdate = status => {
    bulkUpdateStatus({ postIds: selectedRowIds, status });
    setSelectedRowIds([]);
  };

  const handleBulkDelete = () => {
    bulkDestroy({ postIds: selectedRowIds });
    setShouldShowDeleteAlert(false);
    setSelectedRowIds([]);
  };

  return (
    <div className="flex items-center gap-2">
      <Typography>
        <Trans
          components={{ bold: <strong /> }}
          i18nKey="myPosts.postSelectedCount"
          values={{ count: selectedRowCount, totalPostsCount }}
        />
      </Typography>
      <Dropdown buttonStyle="secondary" label={t("myPosts.changeStatus")}>
        <Menu>
          <MenuItemButton onClick={() => handleBulkUpdate("draft")}>
            {t("common.draft")}
          </MenuItemButton>
          <MenuItemButton onClick={() => handleBulkUpdate("published")}>
            {t("common.publish")}
          </MenuItemButton>
        </Menu>
      </Dropdown>
      <Button
        icon={Delete}
        iconPosition="right"
        label={t("common.delete")}
        style="danger-text"
        onClick={() => setShouldShowDeleteAlert(true)}
      />
      <Alert
        isOpen={shouldShowDeleteAlert}
        submitButtonLabel={t("common.delete")}
        title={t("myPosts.bulkDelete.title", { count: selectedRowCount })}
        message={
          <Trans
            components={{ bold: <strong /> }}
            i18nKey="myPosts.bulkDelete.message"
            values={{ count: selectedRowCount }}
          />
        }
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={handleBulkDelete}
      />
    </div>
  );
};

export default Bulk;
