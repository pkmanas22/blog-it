import React from "react";

import CategoryHeader from "./Header";
import CategoryList from "./List";

const Sidebar = () => (
  <div className="neeto-ui-bg-gray-200 h-screen w-2/5 px-5 py-10 md:w-80">
    <CategoryHeader />
    <CategoryList />
  </div>
);

export default Sidebar;
