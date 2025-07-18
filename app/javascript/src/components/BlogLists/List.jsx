import React from "react";

import { PageLoader } from "components/common";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import Item from "./Item";

const List = ({ posts = [], isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(posts)) {
    return (
      <NoData className="mt-40 w-full text-center" title={t("noBlogPosts")} />
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

export default List;
