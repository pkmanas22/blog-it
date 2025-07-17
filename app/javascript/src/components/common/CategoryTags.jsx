import React from "react";

import { Tag } from "neetoui";

const CategoryTags = ({ categories = [] }) => (
  <div>
    {categories.map(({ id, name }) => (
      <Tag className="mr-1" key={id} label={name} style="success" />
    ))}
  </div>
);

export default CategoryTags;
