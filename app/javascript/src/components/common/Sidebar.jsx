import React from "react";

import { Avatar } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom";

import { SIDE_BAR_ITEMS } from "./constants";

const Sidebar = () => (
  <div className="flex w-16 flex-col items-center justify-between border-r-2 p-3 py-5">
    <div>
      {SIDE_BAR_ITEMS.map(({ slug, icon: Icon }) => (
        <NavLink
          exact
          activeClassName="bg-black text-white"
          className="mb-2 block rounded-md p-1"
          key={slug}
          to={slug}
        >
          <Icon />
        </NavLink>
      ))}
    </div>
    <div>
      <Avatar
        size="large"
        user={{
          imageUrl: "https://i.pravatar.cc/300",
          name: "User",
        }}
      />
    </div>
  </div>
);

export default Sidebar;
