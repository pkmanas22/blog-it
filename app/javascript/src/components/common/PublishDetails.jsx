import React from "react";

import { Typography } from "neetoui";
import formatDateWithFallback from "utils/formatDateWithFallback";

const PublishDetails = ({
  authorName,
  lastPublishedDate,
  fallbackText = "",
}) => (
  <div>
    <Typography style="body2" weight="semibold">
      {authorName}
    </Typography>
    <Typography style="body3">
      {formatDateWithFallback(lastPublishedDate, "dd MMMM yyyy", fallbackText)}
    </Typography>
  </div>
);

export default PublishDetails;
