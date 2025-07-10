import React from "react";

import { Typography } from "@bigbinary/neetoui";

const PageHeader = ({ label }) => (
  <Typography className="p-2" style="h1" weight="bold">
    {label}
  </Typography>
);

export default PageHeader;
