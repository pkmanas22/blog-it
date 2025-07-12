import React from "react";

import { Typography } from "neetoui";

const PageHeader = ({ label, children }) => (
  <div className="flex items-center justify-between py-3">
    <Typography style="h1" weight="bold">
      {label}
    </Typography>
    {children && <>{children}</>}
  </div>
);

export default PageHeader;
