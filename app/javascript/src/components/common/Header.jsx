import React from "react";

import { Typography } from "neetoui";

const Header = ({ label, labelTag, children }) => (
  <div className="flex w-11/12 items-center justify-between py-2">
    <div className="flex items-center gap-2">
      <Typography style="h1" weight="bold">
        {label}
      </Typography>
      {labelTag && labelTag}
    </div>
    {children && children}
  </div>
);

export default Header;
