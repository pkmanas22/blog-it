import { QUERY_KEYS } from "constants/query";

import React, { useState } from "react";

import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import queryClient from "utils/queryClient";

import AddCategoryModal from "./AddModal";

const Header = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

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

  return (
    <div className="mb-5 flex items-center justify-between">
      <Typography style="body2" textTransform="uppercase" weight="bold">
        {t("categories")}
      </Typography>
      <div className="flex items-center gap-2">
        <Search className="w-5 cursor-pointer" />
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
  );
};

export default Header;
