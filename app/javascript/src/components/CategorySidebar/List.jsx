import React from "react";

import { PageLoader } from "components/common";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { NoData, Typography } from "neetoui";
import { isEmpty, toLower } from "ramda";
import { useTranslation } from "react-i18next";

const List = ({ searchTerm = "" }) => {
  const { t } = useTranslation();

  const { isLoading, data: { categories = [] } = {} } = useFetchCategories();

  if (isLoading) return <PageLoader />;

  const filteredCategories = categories.filter(({ name: categoryName }) =>
    toLower(categoryName).includes(toLower(searchTerm))
  );

  if (isEmpty(filteredCategories)) {
    return <NoData className="my-4" description={t("noCategories")} />;
  }

  return filteredCategories.map(({ id, name: categoryName }) => (
    <Typography
      className="hover:neeto-ui-bg-gray-100 mb-1 cursor-pointer rounded-md border border-gray-300 px-2 shadow-sm"
      key={id}
    >
      {categoryName}
    </Typography>
  ));
};

export default List;
