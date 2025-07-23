import React from "react";

import { useDeletePost } from "hooks/reactQuery/usePostsApi";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = Dropdown;

const Menubar = () => {
  const { t } = useTranslation();

  const { slug } = useParams();

  const history = useHistory();

  const { mutate: deletePost, isLoading } = useDeletePost();

  const handleDelete = () => {
    deletePost(slug, {
      onSuccess: () => {
        history.push(routes.blogs.index);
      },
    });
  };

  return (
    <Dropdown buttonStyle="text" disabled={isLoading} icon={MenuHorizontal}>
      <Menu>
        <MenuItemButton style="danger" onClick={handleDelete}>
          {t("common.delete")}
        </MenuItemButton>
      </Menu>
    </Dropdown>
  );
};

export default withT(Menubar);
