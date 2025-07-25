import React from "react";

import { Tag } from "neetoui";

const CategoryTags = ({ categories = [] }) => (
  <div className="flex items-center gap-1">
    {categories.map(({ id, name }) => (
      <Tag key={id} label={name} style="success" />
    ))}
  </div>
);

export default CategoryTags;
