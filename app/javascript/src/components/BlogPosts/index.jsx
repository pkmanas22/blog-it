import React from "react";

import { PageHeader } from "components/common";
import { Button } from "neetoui";
import { Link } from "react-router-dom";
import routes from "src/routes";

import List from "./List";

const BlogPosts = () => (
  <>
    <PageHeader label="Blog posts">
      <Link to={routes.blogs.create}>
        <Button label="Add new blog post" />
      </Link>
    </PageHeader>
    <List />
  </>
);

export default BlogPosts;
