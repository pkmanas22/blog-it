import { QUERY_KEYS } from "constants/query";

import React, { useState } from "react";

import classNames from "classnames";
import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import queryClient from "utils/queryClient";

import AddCategoryModal from "./AddModal";

const Header = ({ setSearchTerm }) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { t } = useTranslation();

  const { mutate: createCategory, isLoading } = useCreateCategory();

  const handleCreateCategory = ({ title }) => {
    createCategory(
      { name: title },
      {
        onSuccess: () => {
          setShowAddCategoryModal(false);
          queryClient.invalidateQueries(QUERY_KEYS.CATEGORIES);
        },
      }
    );
  };

  const handleSearchTermChange = useFuncDebounce(({ target: { value } }) => {
    setSearchTerm(value);
  });

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <Typography style="body2" textTransform="uppercase" weight="bold">
          {t("categories")}
        </Typography>
        <div className="flex items-center gap-2">
          <Search
            className="w-5 cursor-pointer"
            onClick={() => setShowSearchInput(previous => !previous)}
          />
          <Plus
            className="w-5 cursor-pointer"
            onClick={() => setShowAddCategoryModal(true)}
          />
        </div>
        <AddCategoryModal
          isOpen={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
          {...{ handleCreateCategory, isLoading }}
        />
      </div>
      <input
        placeholder={t("searchCategory")}
        className={classNames("my-2 block w-full rounded-md px-2 py-1", {
          hidden: !showSearchInput,
        })}
        onChange={handleSearchTermChange}
      />
    </>
  );
};

export default Header;
