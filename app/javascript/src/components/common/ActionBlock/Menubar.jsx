import React, { useState } from "react";

import { useDeletePost } from "hooks/reactQuery/usePostsApi";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

import DeleteModal from "../DeleteModal";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const Menubar = ({ slug, title }) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const { t } = useTranslation();

  const history = useHistory();

  const { mutate: deletePost, isLoading } = useDeletePost();

  const handleDelete = () => {
    deletePost(slug, {
      onSuccess: () => {
        history.push(routes.myPosts);
      },
    });
  };

  return (
    <>
      <Dropdown buttonStyle="text" disabled={isLoading} icon={MenuHorizontal}>
        <Menu>
          <MenuItemButton
            style="danger"
            onClick={() => setShouldShowDeleteAlert(true)}
          >
            {t("common.delete")}
          </MenuItemButton>
        </Menu>
      </Dropdown>
      <DeleteModal
        isOpen={shouldShowDeleteAlert}
        name={title}
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default withT(Menubar);
