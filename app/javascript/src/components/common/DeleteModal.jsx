import React from "react";

import { Alert } from "neetoui";
import { Trans } from "react-i18next";
import withT from "utils/withT";

const DeleteModal = ({ t, isOpen, onClose, onSubmit, name }) => (
  <Alert
    submitButtonLabel={t("deleteConfirmation.button")}
    title={t("deleteConfirmation.title")}
    message={
      <Trans
        components={{ typography: <strong /> }}
        i18nKey="deleteConfirmation.message"
        values={{ name }}
      />
    }
    {...{ onClose, onSubmit, isOpen }}
  />
);

export default withT(DeleteModal);
