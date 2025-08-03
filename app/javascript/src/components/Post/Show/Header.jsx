import React, { useState } from "react";

import classNames from "classnames";
import { PageHeader } from "components/common";
import { notEquals } from "neetocist";
import { Download, Highlight } from "neetoicons";
import { Button, Tag } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";
import useAuthStore from "stores/useAuthStore";
import buildUrl from "utils/buildUrl";

import DownloadModal from "./DownloadModal";

const Header = ({ title, author: { id: authorId } = {}, status, slug }) => {
  const [shouldDownloadModalOpen, setShouldDownloadModalOpen] = useState(false);
  const { t } = useTranslation();

  const authUser = useAuthStore.pickFrom();

  return (
    <>
      <PageHeader
        label={title}
        labelTag={
          equals(status, "draft") ? <Tag label="Draft" style="warning" /> : null
        }
      >
        <div>
          <Button
            icon={Download}
            style="text"
            tooltipProps={{
              content: t("common.download"),
              position: "top",
            }}
            onClick={() => setShouldDownloadModalOpen(true)}
          />
          <Button
            icon={Highlight}
            style="text"
            to={buildUrl(routes.posts.edit, { slug })}
            className={classNames({
              hidden: notEquals(authorId, authUser?.userId),
            })}
            tooltipProps={{
              content: t("common.edit"),
              position: "top",
            }}
          />
        </div>
      </PageHeader>
      <DownloadModal
        {...{ slug }}
        isOpen={shouldDownloadModalOpen}
        onClose={() => setShouldDownloadModalOpen(false)}
      />
    </>
  );
};

export default Header;
