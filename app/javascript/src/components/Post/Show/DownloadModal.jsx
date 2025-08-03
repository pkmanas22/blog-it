import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createAuthenticatedConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/common";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const { Header, Body } = Modal;

const DownloadModal = ({ isOpen, onClose, slug }) => {
  const [progress, setProgress] = useState(0);

  const { t } = useTranslation();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const data = await postsApi.download(slug);
      FileSaver.saveAs(data, `${slug}.pdf`);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    let consumer = null;
    let subscription = null;

    if (isOpen) {
      try {
        consumer = createAuthenticatedConsumer();

        subscription = subscribeToReportDownloadChannel({
          consumer,
          setProgress,
          generatePdf,
        });
      } catch (error) {
        Logger.error("Failed to create WebSocket consumer:", error);
      }
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }

      if (consumer) {
        consumer.disconnect();
      }
    };
  }, [isOpen, slug]);

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
      setTimeout(() => onClose(), 1000);
    }
  }, [progress]);

  return (
    <Modal
      {...{ isOpen, onClose }}
      closeButton={false}
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
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
