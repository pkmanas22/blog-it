import React from "react";

import { useAuthLogout } from "hooks/reactQuery/useAuthApi";
import { LeftArrow } from "neetoicons";
import { Avatar, Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import useAuthStore from "stores/useAuthStore";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
  Divider,
} = Dropdown;

const FooterProfile = () => {
  const { t } = useTranslation();

  const authUser = useAuthStore.pickFrom();

  const { email, userName: name } = authUser;

  const { mutate: logoutUser } = useAuthLogout();

  return (
    <Dropdown
      offset={[0, 20]}
      position="right-start"
      customTarget={
        <Avatar className="cursor-pointer" size="medium" user={{ name }} />
      }
    >
      <Menu className="min-w-[220px] space-y-2 p-3">
        <div className="flex items-center gap-3">
          <Avatar size="large" user={{ name }} />
          <div>
            <Typography weight="semibold">{name}</Typography>
            <Typography className="truncate" style="body2">
              {email}
            </Typography>
          </div>
        </div>
        <Divider />
        <MenuItemButton prefix={<LeftArrow size={20} />} onClick={logoutUser}>
          {t("auth.logout")}
        </MenuItemButton>
      </Menu>
    </Dropdown>
  );
};

export default FooterProfile;
