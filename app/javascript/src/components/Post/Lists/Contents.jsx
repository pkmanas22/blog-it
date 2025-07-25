import React from "react";

import { PageLoader } from "components/common";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";

import Item from "./Item";

const Contents = ({ posts = [], isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData
          image="https://cdn-icons-png.flaticon.com/512/15/15457.png"
          title={t("noData.blog.title")}
          primaryButtonProps={{
            label: t("noData.blog.button"),
            to: routes.posts.create,
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <Item key={post?.id} {...post} />
      ))}
    </div>
  );
};

export default Contents;
