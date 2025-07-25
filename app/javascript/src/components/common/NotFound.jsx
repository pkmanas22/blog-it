import React from "react";

import { NoData } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const NotFound = ({ t }) => (
  <div className="flex h-screen flex-1 items-center justify-center">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.button"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withT(NotFound);
