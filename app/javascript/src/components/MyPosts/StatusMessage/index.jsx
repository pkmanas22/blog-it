import React from "react";

import useQueryParams from "hooks/useQueryParams";
import { isPresent } from "neetocist";
import { Typography } from "neetoui";
import { any, isNotEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import BulkOperationMessage from "./Bulk";
import FilterMessage from "./Filter";

const StatusMessage = ({
  totalPostsCount,
  setSelectedRowIds,
  selectedRowIds = [],
}) => {
  const { t } = useTranslation();

  const { title, category, status } = useQueryParams();

  const shouldShowFilteredMessage = any(isPresent)([title, category, status]);

  if (isNotEmpty(selectedRowIds)) {
    return (
      <BulkOperationMessage
        {...{ selectedRowIds, setSelectedRowIds, totalPostsCount }}
      />
    );
  }

  if (shouldShowFilteredMessage) {
    return <FilterMessage {...{ totalPostsCount }} />;
  }

  return (
    <Typography style="h3" weight="semibold">
      {t("myPosts.postCount", { count: totalPostsCount })}
    </Typography>
  );
};

export default StatusMessage;
