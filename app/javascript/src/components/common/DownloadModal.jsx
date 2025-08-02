import React, { useEffect, useState } from "react";

import { createConsumer } from "@rails/actioncable";
import postsApi from "apis/posts";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/common";
import FileSaver from "file-saver";
import { useGeneratePostReport } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const { Header, Body } = Modal;

const DownloadModal = ({ isOpen, onClose, slug }) => {
  const [progress, setProgress] = useState(0);

  const { t } = useTranslation();

  const { mutate: generateReport } = useGeneratePostReport();

  const consumer = createConsumer();

  const downloadPdf = async () => {
    try {
      const { data } = await postsApi.download(slug);
      FileSaver.saveAs(data, `${slug}.pdf`);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      subscribeToReportDownloadChannel({
        consumer,
        setProgress,
        generatePdf: () => generateReport(slug),
      });
    }

    return () => {
      consumer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
    }
  }, [progress]);

  return (
    <Modal {...{ isOpen, onClose }}>
      <Header>
        <Typography id="dialog1Title" style="h2">
          {t("post.download")}
        </Typography>
      </Header>
      <Body className="my-4">
        <ProgressBar {...{ progress }} />
      </Body>
    </Modal>
  );
};

export default DownloadModal;
