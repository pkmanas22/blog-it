import React from "react";

import classNames from "classnames";
import { CategoryTags, PublishDetails } from "components/common";
import { truncate } from "neetocist";
import { Tag, Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";
import withT from "utils/withT";

import Vote from "./Vote";

const Item = ({
  t,
  title,
  description,
  lastPublishedDate,
  slug,
  author: { name: authorName } = {},
  categories = [],
  myVote,
  netVotes,
  isBloggable,
}) => (
  <div className="flex w-11/12 justify-between space-y-2 rounded-md border-b-2 bg-white p-2 shadow-sm">
    <div>
      <Link
        className="flex items-center gap-3"
        to={buildUrl(routes.posts.show, { slug })}
      >
        <Typography
          className="inline hover:underline"
          style="h3"
          weight="semibold"
        >
          {title}
        </Typography>
        <Tag
          className={classNames({ hidden: !isBloggable })}
          label={t("common.title")}
          style="secondary"
        />
      </Link>
      <CategoryTags {...{ categories }} />
      <Typography className="w-11/12" style="body2">
        {truncate(description, 250)}
      </Typography>
      <PublishDetails {...{ authorName, lastPublishedDate }} />
    </div>
    <div className=" w-1/5">
      <Vote {...{ myVote, netVotes, slug }} />
    </div>
  </div>
);

export default withT(Item);
