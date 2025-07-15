import React from "react";

import { PageHeader } from "components/common";
import { Button } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

import CategoryWiseList from "./List";
import CategoriesSidebar from "./Sidebar";

const Category = ({ t }) => (
  <div className="flex">
    <CategoriesSidebar />
    <div className="h-screen flex-1 py-8 pl-8">
      <PageHeader label={t("blogPosts")}>
        <Link to={routes.blogs.create}>
          <Button label={t("addNewBlog")} />
        </Link>
      </PageHeader>
      <div className="h-full overflow-y-auto p-6">
        <CategoryWiseList />
      </div>
    </div>
  </div>
);

export default withT(Category);
