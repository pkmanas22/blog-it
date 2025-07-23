import React from "react";

import { ActionDropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import ItemButton from "./ItemButton";
import Menubar from "./Menubar";

const { Menu } = ActionDropdown;

const ActionBlock = ({
  isPublishButtonActive,
  setIsPublishButtonActive,
  handleActionSubmit,
  shouldShowMenubar = false,
}) => {
  const { t } = useTranslation();

  const history = useHistory();

  const dropdownButtonLabel = isPublishButtonActive
    ? t("blog.publish")
    : t("blog.saveDraft");

  return (
    <div className="flex items-center gap-3">
      <Button
        label={t("common.cancel")}
        style="secondary"
        onClick={() => history.goBack()}
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
            label={t("blog.publish")}
          />
          <ItemButton
            handleClick={() => setIsPublishButtonActive(false)}
            isActive={!isPublishButtonActive}
            label={t("blog.saveDraft")}
          />
        </Menu>
      </ActionDropdown>
      {shouldShowMenubar && <Menubar />}
    </div>
  );
};

export default ActionBlock;
