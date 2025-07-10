import React from "react";

import { truncate } from "@bigbinary/neeto-cist";
import { Typography } from "@bigbinary/neetoui";
import { formatDate } from "date-fns";

const Card = ({ title, description, created_at: createdAt }) => (
  <div className="space-y-2 rounded-md border-b-2 p-2 shadow-sm">
    <Typography style="h3" weight="semibold">
      {title}
    </Typography>
    <Typography className="w-4/5">{truncate(description, 200)}</Typography>
    <Typography style="body2">
      {formatDate(new Date(createdAt), "dd MMMM yyyy")}
    </Typography>
  </div>
);

export default Card;
