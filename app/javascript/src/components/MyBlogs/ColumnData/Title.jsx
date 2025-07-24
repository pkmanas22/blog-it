import React from "react";

import { truncate } from "neetocist";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

const Title = ({ label, slug }) => (
  <Link to={buildUrl(routes.blogs.show, { slug })}>
    <Typography component="span" title={label}>
      {truncate(label, 40)}
    </Typography>
  </Link>
);

export default Title;
