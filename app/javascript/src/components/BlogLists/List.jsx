import React from "react";

import { PageLoader } from "components/common";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import Item from "./Item";

const List = () => {
  const queryParams = useQueryParams();
  const { category = [] } = queryParams;

  const { t } = useTranslation();

  const { data: { posts = [] } = {}, isLoading } = useFetchPosts({ category });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(posts)) {
    return (
      <NoData className="mt-40 w-full text-center" title={t("noBlogPosts")} />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex-1 flex-col gap-3 overflow-y-auto">
        {posts.map(post => (
          <Item key={post?.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default List;
