import React from "react";

import { PageLoader } from "components/common";
import { formatCategoriesForSelectInput } from "components/Post/utils";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import useQueryParams from "hooks/useQueryParams";
import { findBy } from "neetocist";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Select as FormikSelect,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { FILTER_PANE_FORM_INITIAL_VALUES, STATUS_OPTIONS } from "./constant";

import { getSelectedCategories } from "../utils";

const Form = ({ handleFormSubmit, formikRef }) => {
  const { t } = useTranslation();
  const { title, category, status } = useQueryParams();

  const { data: categories = [], isLoading } = useFetchCategories();

  const categoryOptions = formatCategoriesForSelectInput(categories);

  const initialValues = {
    ...FILTER_PANE_FORM_INITIAL_VALUES,
    title,
    categories: getSelectedCategories(category, categoryOptions),
    status: findBy({ value: status }, STATUS_OPTIONS),
  };

  if (isLoading) return <PageLoader />;

  return (
    <NeetoUIForm
      className="w-full"
      formikProps={{
        initialValues,
        innerRef: formikRef,
        onSubmit: handleFormSubmit,
      }}
    >
      <div className="w-full space-y-4">
        <FormikInput
          className="w-full"
          label={t("form.title")}
          name="title"
          placeholder={t("form.placeholders.title")}
        />
        <FormikSelect
          isMulti
          label={t("form.category")}
          name="categories"
          options={categoryOptions}
          placeholder={t("form.placeholders.category")}
        />
        <FormikSelect
          label={t("form.status")}
          name="status"
          options={STATUS_OPTIONS}
          placeholder={t("form.placeholders.status")}
        />
      </div>
    </NeetoUIForm>
  );
};

export default Form;
