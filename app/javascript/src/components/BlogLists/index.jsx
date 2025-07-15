import React from "react";

import { PageHeader } from "components/common";
import { Button } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

import List from "./List";

const BlogLists = ({ t }) => (
  <>
    <PageHeader label={t("blogPosts")}>
      <Link to={routes.blogs.create}>
        <Button label={t("addNewBlog")} />
      </Link>
    </PageHeader>
    <div className="h-full overflow-y-auto">
      <List />
    </div>
  </>
);

export default withT(BlogLists);
