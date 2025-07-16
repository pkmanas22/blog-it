import React from "react";

import CategorySidebar from "components/CategorySidebar";
import { PageHeader } from "components/common";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "routes";
import useCategoriesStore from "stores/useCategoriesStore";

import List from "./List";

const BlogLists = () => {
  const { t } = useTranslation();

  const isCategorySidebarOpen = useCategoriesStore(
    state => state.isCategorySidebarOpen
  );

  return (
    <div className="flex h-full w-full overflow-hidden">
      {isCategorySidebarOpen && <CategorySidebar />}
      <div className=" flex flex-1 flex-col overflow-hidden bg-white py-12 pl-8">
        <PageHeader label={t("blogPosts")}>
          <Link to={routes.blogs.create}>
            <Button label={t("addNewBlog")} />
          </Link>
        </PageHeader>
        <div className="flex-1 overflow-y-auto pb-10">
          <List />
        </div>
      </div>
    </div>
  );
};

export default BlogLists;
