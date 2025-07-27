import React from "react";

import useGoBackSafely from "hooks/useGoBackSafely";
import { ActionDropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import ItemButton from "./ItemButton";

const { Menu } = ActionDropdown;

const ActionBlock = ({
  isPublishButtonActive,
  setIsPublishButtonActive,
  handleActionSubmit,
}) => {
  const { t } = useTranslation();

  const handleCancel = useGoBackSafely();

  const dropdownButtonLabel = isPublishButtonActive
    ? t("common.publish")
    : t("common.saveDraft");

  return (
    <div className="flex items-center gap-3">
      <Button
        label={t("common.cancel")}
        style="secondary"
        onClick={handleCancel}
      />
      <ActionDropdown
        buttonStyle="primary"
        label={dropdownButtonLabel}
        onClick={handleActionSubmit}
      >
        <Menu>
          <ItemButton
            handleClick={() => setIsPublishButtonActive(true)}
            isActive={isPublishButtonActive}
            label={t("common.publish")}
          />
          <ItemButton
            handleClick={() => setIsPublishButtonActive(false)}
            isActive={!isPublishButtonActive}
            label={t("common.saveDraft")}
          />
        </Menu>
      </ActionDropdown>
    </div>
  );
};

export default ActionBlock;
