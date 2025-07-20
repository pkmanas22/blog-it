import React from "react";

import { resetAuthTokens } from "apis/axios";
import { useAuthLogout } from "hooks/reactQuery/useAuthApi";
import { LeftArrow } from "neetoicons";
import { Avatar, Typography, Dropdown } from "neetoui";
import useAuthStore from "stores/useAuthStore";
import queryClient from "utils/queryClient";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
  Divider,
} = Dropdown;

const SidebarFooterProfile = () => {
  const { email, userName: name } = useAuthStore(state => state.authUser);

  const clearAuth = useAuthStore(state => state.clearAuth);

  const { mutate: logoutUser } = useAuthLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        clearAuth();
        resetAuthTokens();
        queryClient.clear();
      },
    });
  };

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
        <MenuItemButton prefix={<LeftArrow size={20} />} onClick={handleLogout}>
          Logout
        </MenuItemButton>
      </Menu>
    </Dropdown>
  );
};

export default SidebarFooterProfile;
