import React from "react";

import { PageHeader } from "components/common";
import { Button } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import withT from "utils/withT";

const Header = ({ t }) => (
  <div className="pl-8 pr-8 pt-12">
    <PageHeader label={t("post.lists")}>
      <Link to={routes.posts.create}>
        <Button label={t("post.addNew")} />
      </Link>
    </PageHeader>
  </div>
);

export default withT(Header);
