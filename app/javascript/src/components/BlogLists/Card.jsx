import React from "react";

import { formatDate } from "date-fns";
import { truncate } from "neetocist";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "src/routes";
import buildUrl from "utils/buildUrl";

const Card = ({ title, description, createdAt, slug }) => (
  <div className="w-11/12 space-y-2 rounded-md border-b-2 p-2 shadow-sm">
    <Link to={buildUrl(routes.blogs.show, { slug })}>
      <Typography className="hover:underline" style="h3" weight="semibold">
        {title}
      </Typography>
    </Link>
    <Typography className="w-4/5">{truncate(description, 200)}</Typography>
    <Typography style="body2">
      {formatDate(new Date(createdAt), "dd MMMM yyyy")}
    </Typography>
  </div>
);

export default Card;
