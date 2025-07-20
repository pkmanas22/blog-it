import React from "react";

import classNames from "classnames";
import { ListDetails } from "neetoicons";
import { NavLink, useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";

import { SIDE_BAR_ITEMS } from "./constants";
import SidebarFooterProfile from "./SidebarFooterProfile";

const Sidebar = () => {
  const history = useHistory();

  const toggleCategorySidebarOpen = useCategoriesStore(
    state => state.toggleCategorySidebarOpen
  );

  const isCategorySidebarOpen = useCategoriesStore(
    state => state.isCategorySidebarOpen
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
            activeClassName="bg-black text-white hover:bg-gray-600"
            className="mb-2 block h-8 w-8 rounded-md p-1 hover:bg-gray-200"
            key={slug}
            to={slug}
          >
            <Icon />
          </NavLink>
        ))}
        <div
          className={classNames(
            "mb-2 block h-8 w-8 cursor-pointer rounded-md p-1 hover:bg-gray-200",
            {
              "bg-gray-800 text-white hover:bg-gray-600": isCategorySidebarOpen,
            }
          )}
          onClick={handleCategoryClick}
        >
          <ListDetails />
        </div>
      </div>
      <SidebarFooterProfile />
    </div>
  );
};

export default Sidebar;
