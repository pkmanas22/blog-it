import React from "react";

import { truncate } from "neetocist";
import { Button } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

const Title = ({ label, slug }) => (
  <Link to={buildUrl(routes.posts.edit, { slug })}>
    <Button
      className="text-left hover:underline"
      component="span"
      style="link"
      tooltipProps={{ content: label, position: "top" }}
    >
      {truncate(label, 50)}
    </Button>
  </Link>
);

export default Title;
