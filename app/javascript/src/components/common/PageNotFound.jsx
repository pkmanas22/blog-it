import React from "react";

import { NoData } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="absolute left-1/3 top-1/3">
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

export default withT(PageNotFound);
