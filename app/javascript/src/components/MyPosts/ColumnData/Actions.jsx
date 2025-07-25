import React from "react";

import { useDeletePost, useEditPost } from "hooks/reactQuery/usePostsApi";
import { notEquals } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
  Divider,
} = Dropdown;

const Actions = ({ status, slug }) => {
  const { t } = useTranslation();

  const { mutate: editPost, isLoading: isSubmissionLoading } =
    useEditPost(slug);

  const { mutate: deletePost, isLoading: isDeleteLoading } = useDeletePost();

  const isPublished = notEquals(status, "draft");

  const statusToShow = isPublished
    ? t("common.unpublish")
    : t("common.publish");

  const handleActionClick = () => {
    const params = {
      status: isPublished ? "draft" : "published",
    };

    editPost(params);
  };

  return (
    <Dropdown
      buttonStyle="text"
      disabled={isSubmissionLoading || isDeleteLoading}
      icon={MenuHorizontal}
      strategy="fixed"
    >
      <Menu>
        <MenuItemButton onClick={handleActionClick}>
          {statusToShow}
        </MenuItemButton>
        <Divider />
        <MenuItemButton style="danger" onClick={() => deletePost(slug)}>
          {t("common.delete")}
        </MenuItemButton>
      </Menu>
    </Dropdown>
  );
};

export default Actions;
