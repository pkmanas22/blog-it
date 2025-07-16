import React from "react";

import { ListDetails } from "neetoicons";
import { Avatar } from "neetoui";
import { NavLink, useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";

import { SIDE_BAR_ITEMS, DEFAULT_AVATAR_URL } from "./constants";

const Sidebar = () => {
  const history = useHistory();

  const toggleCategorySidebarOpen = useCategoriesStore(
    state => state.toggleCategorySidebarOpen
  );

  const handleCategoryClick = () => {
    history.push(routes.blogs.index);
    toggleCategorySidebarOpen();
  };

  return (
    <div className="flex w-16 flex-col items-center justify-between border-r-2 p-3 py-5">
      <div>
        {SIDE_BAR_ITEMS.map(({ slug, icon: Icon }) => (
          <NavLink
            exact
            activeClassName="bg-black text-white hover:bg-black"
            className="mb-2 block h-8 w-8 rounded-md p-1 hover:bg-gray-200"
            key={slug}
            to={slug}
          >
            <Icon />
          </NavLink>
        ))}
        <div
          className="mb-2 block h-8 w-8 cursor-pointer rounded-md p-1 hover:bg-gray-200"
          onClick={handleCategoryClick}
        >
          <ListDetails />
        </div>
      </div>
      <div>
        <Avatar
          size="large"
          user={{
            imageUrl: DEFAULT_AVATAR_URL,
            name: "User",
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
