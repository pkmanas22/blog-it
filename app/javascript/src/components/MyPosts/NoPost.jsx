import React from "react";

import { PageHeader } from "components/common";
import { NoData } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const NoPost = ({ t }) => (
  <div className="h-full space-y-4 pl-12 pt-12">
    <PageHeader label={t("myPosts.header")} />
    <div className="flex w-full items-center justify-center">
      <NoData
        image="https://cdn-icons-png.flaticon.com/512/15/15457.png"
        title={t("noData.blog.title")}
        primaryButtonProps={{
          label: t("noData.blog.button"),
          to: routes.posts.create,
        }}
      />
    </div>
  </div>
);

export default withT(NoPost);
