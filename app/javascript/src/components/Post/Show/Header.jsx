import React from "react";

import classNames from "classnames";
import { PageHeader } from "components/common";
import { notEquals } from "neetocist";
import { Highlight } from "neetoicons";
import { Button, Tag } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";
import useAuthStore from "stores/useAuthStore";
import buildUrl from "utils/buildUrl";

const Header = ({ title, author: { id: authorId } = {}, status, slug }) => {
  const { t } = useTranslation();

  const authUser = useAuthStore.pickFrom();

  return (
    <PageHeader
      label={title}
      labelTag={
        equals(status, "draft") ? <Tag label="Draft" style="warning" /> : null
      }
    >
      <Button
        icon={Highlight}
        style="tertiary"
        to={buildUrl(routes.posts.edit, { slug })}
        className={classNames({
          hidden: notEquals(authorId, authUser?.userId),
        })}
        tooltipProps={{
          content: t("common.edit"),
          position: "top",
        }}
      />
    </PageHeader>
  );
};

export default Header;
