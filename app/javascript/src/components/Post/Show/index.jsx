import React from "react";

import {
  PageLoader,
  CategoryTags,
  AvatarProfile,
  PageNotFound,
  PublishDetails,
} from "components/common";
import useFetchPostWithStatus from "hooks/useFetchPostWithStatus";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Header from "./Header";

const Show = () => {
  const { t } = useTranslation();

  const { post, isPostLoading, isPostNotFound } = useFetchPostWithStatus();

  const {
    description,
    categories,
    author: { name: authorName } = {},
    lastPublishedDate,
  } = post;

  if (isPostLoading) return <PageLoader />;

  if (isPostNotFound) {
    return <PageNotFound />;
  }

  return (
    <div className="flex h-full flex-col pl-12 pt-12">
      <CategoryTags {...{ categories }} />
      <Header {...post} />
      <div className="flex items-center gap-3 py-2">
        <AvatarProfile />
        <PublishDetails
          {...{
            authorName,
            lastPublishedDate,
            fallbackText: t("post.notPublished"),
          }}
        />
      </div>
      <Typography className="w-11/12 whitespace-pre-line pb-3">
        {description}
      </Typography>
    </div>
  );
};

export default Show;
