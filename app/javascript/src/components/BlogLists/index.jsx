import React from "react";

import { PageHeader } from "components/common";
import { Button } from "neetoui";
import { Link } from "react-router-dom";
import routes from "src/routes";
import withT from "utils/withT";

import List from "./List";

const BlogLists = ({ t }) => (
  <>
    <PageHeader label={t("blogPosts")}>
      <Link to={routes.blogs.create}>
        <Button label={t("addNewBlog")} />
      </Link>
    </PageHeader>
    <List />
  </>
);

export default withT(BlogLists);
