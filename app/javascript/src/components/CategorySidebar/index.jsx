import React, { useState } from "react";

import CategoryHeader from "./Header";
import CategoryList from "./List";

const CategorySidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="neeto-ui-bg-gray-200 block h-screen w-2/5 px-5 py-10 md:w-80">
      <CategoryHeader {...{ setSearchTerm }} />
      <CategoryList {...{ searchTerm }} />
    </div>
  );
};

export default CategorySidebar;
