import React from "react";

import { Tag } from "neetoui";

const CategoryTags = ({ categories = [] }) =>
  categories.map(({ id, name }) => (
    <Tag className="mr-1" key={id} label={name} style="success" />
  ));

export default CategoryTags;
