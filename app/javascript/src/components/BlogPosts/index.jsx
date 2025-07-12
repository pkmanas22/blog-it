import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import List from "./List";

import routes from "../../routes";
import { PageHeader } from "../common";

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
