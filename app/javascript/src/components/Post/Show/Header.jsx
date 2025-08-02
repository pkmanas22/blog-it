import React from "react";

import postsApi from "apis/posts";
import classNames from "classnames";
import { PageHeader } from "components/common";
import FileSaver from "file-saver";
import { useGeneratePostReport } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { notEquals } from "neetocist";
import { Download, Highlight } from "neetoicons";
import { Button, Tag } from "neetoui";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";
import routes from "routes";
import useAuthStore from "stores/useAuthStore";
import buildUrl from "utils/buildUrl";

const Header = ({ title, author: { id: authorId } = {}, status, slug }) => {
  // const [shouldDownloadModalOpen, setShouldDownloadModalOpen] = useState(false);
  const { t } = useTranslation();

  const authUser = useAuthStore.pickFrom();
  // TODO: Move this logic to socket
  const { mutate: generateReport } = useGeneratePostReport();

  const downloadPdf = async () => {
    try {
      generateReport(slug);

      await new Promise(resolve => setTimeout(() => resolve(), 3000));
      const data = await postsApi.download(slug);
      FileSaver.saveAs(data, `${slug}.pdf`);
    } catch (error) {
      Logger.error(error);
    }
  };

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
            onClick={downloadPdf}
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
      {/* <DownloadModal
        {...{ slug }}
        isOpen={shouldDownloadModalOpen}
        onClose={() => setShouldDownloadModalOpen(false)}
      /> */}
    </>
  );
};

export default Header;
