import React, { useState } from "react";

import { DeleteModal } from "components/common";
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

const Actions = ({ status, slug, title }) => {
  const [postToDelete, setPostToDelete] = useState(null);

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

  const handleDelete = () => {
    if (!postToDelete) return;

    deletePost(slug, {
      onSuccess: () => {
        setPostToDelete(null);
      },
    });
  };

  return (
    <>
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
          <MenuItemButton
            style="danger"
            onClick={() => setPostToDelete({ slug, title })}
          >
            {t("common.delete")}
          </MenuItemButton>
        </Menu>
      </Dropdown>
      <DeleteModal
        isOpen={postToDelete !== null}
        name={postToDelete?.title || ""}
        onClose={() => setPostToDelete(null)}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default Actions;
