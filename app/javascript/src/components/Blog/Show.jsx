import React from "react";

import classNames from "classnames";
import {
  PageLoader,
  PageHeader,
  CategoryTags,
  AvatarProfile,
  PageNotFound,
} from "components/common";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { notEquals } from "neetocist";
import { Highlight } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";
import useAuthStore from "stores/useAuthStore";
import buildUrl from "utils/buildUrl";
import formatDateWithFallback from "utils/formatDateWithFallback";

const Show = () => {
  const { t } = useTranslation();

  const { slug } = useParams();

  const { data: post = {}, isLoading, error } = useShowPost(slug);

  const authUser = useAuthStore(state => state.authUser);

  const {
    title,
    description,
    categories,
    author: { name: authorName, id: authorId } = {},
    lastPublishedDate,
    status,
  } = post;

  if (isLoading) return <PageLoader />;

  if (error?.status === 404) {
    return <PageNotFound />;
  }

  return (
    <div className="flex h-full flex-col pl-12 pt-12">
      <CategoryTags {...{ categories }} />
      <PageHeader
        label={title}
        labelTag={
          equals(status, "draft") ? <Tag label="Draft" style="warning" /> : null
        }
      >
        <Button
          icon={Highlight}
          style="tertiary"
          to={buildUrl(routes.blogs.edit, { slug })}
          className={classNames({
            hidden: notEquals(authorId, authUser?.userId),
          })}
          tooltipProps={{
            content: t("common.edit"),
            position: "top",
          }}
        />
      </PageHeader>
      <div className="flex items-center gap-3 py-2">
        <AvatarProfile />
        <div>
          <Typography style="body1" weight="semibold">
            {authorName}
          </Typography>
          <Typography style="body2">
            {formatDateWithFallback(
              lastPublishedDate,
              "dd MMMM yyyy",
              t("blog.notPublished")
            )}
          </Typography>
        </div>
      </div>
      <Typography className="w-11/12 whitespace-pre-line pb-3">
        {description}
      </Typography>
    </div>
  );
};

export default Show;
