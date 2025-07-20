import React from "react";

import { Sidebar } from "components/common";

const SidebarLayout = ({ children }) => (
  <div className="neeto-ui-bg-white flex h-screen w-screen">
    <Sidebar />
    <div className="flex-1 overflow-x-hidden">{children}</div>
  </div>
);

export default SidebarLayout;
