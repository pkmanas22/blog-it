import React from "react";

import classNames from "classnames";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Typography } from "neetoui";
import { append, includes, is, map, toLower, without } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import buildUrl from "utils/buildUrl";

const Item = ({ name: categoryName }) => {
  const { category = [] } = useQueryParams();

  const history = useHistory();

  const paramsCategories = is(Array, category) ? category : [category];

  const isSelected = includes(
    toLower(categoryName),
    map(toLower, paramsCategories)
  );

  const updatedCategories = isSelected
    ? without([categoryName], paramsCategories)
    : append(categoryName, paramsCategories);

  const handleUpdateParams = () => {
    history.replace(
      buildUrl(
        routes.blogs.index,
        filterNonNull({ category: updatedCategories })
      )
    );
  };

  return (
    <Typography
      className={classNames(
        "mb-1 cursor-pointer rounded-md border px-2 shadow-sm",
        {
          "border-gray-200 bg-white text-black": isSelected,
          "border-gray-300 hover:bg-gray-100": !isSelected,
        }
      )}
      onClick={handleUpdateParams}
    >
      {categoryName}
    </Typography>
  );
};

export default Item;
