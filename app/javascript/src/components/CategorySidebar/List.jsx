import React from "react";

import { PageLoader } from "components/common";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { NoData } from "neetoui";
import { isEmpty, toLower } from "ramda";
import { useTranslation } from "react-i18next";

import Item from "./Item";

const List = ({ searchTerm = "" }) => {
  const { t } = useTranslation();

  const { isLoading, data: { categories = [] } = {} } = useFetchCategories();

  if (isLoading) return <PageLoader />;

  const filteredCategories = categories.filter(({ name: categoryName }) =>
    toLower(categoryName).includes(toLower(searchTerm))
  );

  if (isEmpty(filteredCategories)) {
    return <NoData className="my-4" description={t("category.noCategories")} />;
  }

  return filteredCategories.map(category => (
    <Item key={category.id} {...category} />
  ));
};

export default List;
