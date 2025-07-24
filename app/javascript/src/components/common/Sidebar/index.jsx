import React from "react";

import classNames from "classnames";
import { ListDetails } from "neetoicons";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";

import FooterProfile from "./FooterProfile";

import { SIDE_BAR_ITEMS } from "../constants";

const Sidebar = () => {
  const { t } = useTranslation();

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
        {SIDE_BAR_ITEMS.map(({ slug, icon: Icon, label }) => (
          <NavLink
            exact
            activeClassName="bg-black text-white hover:bg-gray-600"
            className="mb-2 block h-8 w-8 rounded-md p-1 hover:bg-gray-200"
            key={slug}
            title={label}
            to={slug}
          >
            <Icon />
          </NavLink>
        ))}
        <div
          title={t("blog.category")}
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
      <FooterProfile />
    </div>
  );
};

export default Sidebar;
