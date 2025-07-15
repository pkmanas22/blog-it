import React from "react";

import { PageLoader } from "components/common";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const List = () => {
  const { t } = useTranslation();

  const { isLoading, data: { categories = [] } = {} } = useFetchCategories();

  if (isLoading) return <PageLoader />;

  if (isEmpty(categories)) return <NoData title={t("noCategories")} />;

  return categories.map(({ id, name: categoryName }) => (
    <Typography
      className="mb-1 cursor-pointer rounded-sm border border-gray-300 px-2 shadow-sm"
      key={id}
    >
      {categoryName}
    </Typography>
  ));
};

export default List;
