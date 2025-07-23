import React from "react";

import { CategoryTags } from "components/common";
import { formatDate } from "date-fns";
import { truncate } from "neetocist";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

const Item = ({
  title,
  description,
  createdAt,
  slug,
  author: { name: authorName } = {},
  categories = [],
}) => (
  <div className="w-11/12 space-y-2 rounded-md border-b-2 bg-white p-2 shadow-sm">
    <Link to={buildUrl(routes.blogs.show, { slug })}>
      <Typography
        className="inline hover:underline"
        style="h3"
        weight="semibold"
      >
        {title}
      </Typography>
    </Link>
    <CategoryTags {...{ categories }} />
    <Typography className="w-4/5" style="body2">
      {truncate(description, 200)}
    </Typography>
    <div>
      <Typography style="body3" weight="semibold">
        {authorName}
      </Typography>
      <Typography style="body3">
        {formatDate(new Date(createdAt), "dd MMMM yyyy")}
      </Typography>
    </div>
  </div>
);

export default Item;
