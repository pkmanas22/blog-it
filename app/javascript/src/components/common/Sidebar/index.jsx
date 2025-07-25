import React from "react";

import classNames from "classnames";
import { ListDetails } from "neetoicons";
import { Button } from "neetoui";
import { paths } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";
import { useShallow } from "zustand/shallow";

import FooterProfile from "./FooterProfile";
import SidebarItem from "./Item";

import { SIDE_BAR_ITEMS } from "../constants";

const Sidebar = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const [isCategorySidebarOpen, toggleCategorySidebarOpen] = useCategoriesStore(
    useShallow(
      paths([["isCategorySidebarOpen"], ["toggleCategorySidebarOpen"]])
    )
  );

  const handleCategoryClick = () => {
    history.push(routes.posts.index);
    toggleCategorySidebarOpen();
  };

  return (
    <div className="flex w-16 flex-col items-center justify-between border-r-2 p-3 py-5">
      <div>
        {SIDE_BAR_ITEMS.map(itemDetails => (
          <SidebarItem key={itemDetails.slug} {...itemDetails} />
        ))}
        <Button
          style="text"
          tooltipProps={{ content: t("post.category") }}
          className={classNames(
            "mb-2 block h-8 w-8 cursor-pointer rounded-md p-1 hover:bg-gray-200",
            {
              "bg-gray-800 text-white hover:bg-gray-600": isCategorySidebarOpen,
            }
          )}
          onClick={handleCategoryClick}
        >
          <ListDetails />
        </Button>
      </div>
      <FooterProfile />
    </div>
  );
};

export default Sidebar;
