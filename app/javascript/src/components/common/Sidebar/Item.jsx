import React from "react";

import { Tooltip } from "neetoui";
import { NavLink } from "react-router-dom";

const Item = ({ label, slug, icon: Icon }) => (
  <Tooltip content={label} key={slug}>
    <NavLink
      exact
      activeClassName="bg-black text-white hover:bg-gray-600"
      className="mb-2 block h-8 w-8 rounded-md p-1 hover:bg-gray-200"
      to={slug}
    >
      <Icon />
    </NavLink>
  </Tooltip>
);

export default Item;
