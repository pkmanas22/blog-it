import React from "react";

import { formatCategoriesForSelectInput } from "components/Post/utils";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Select as FormikSelect,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { FILTER_PANE_FORM_INITIAL_VALUES, STATUS_OPTIONS } from "./constant";

const Form = ({ handleFormSubmit, formikRef }) => {
  const { t } = useTranslation();

  const { data: categories = [] } = useFetchCategories();

  const categoryOptions = formatCategoriesForSelectInput(categories);

  return (
    <NeetoUIForm
      className="w-full"
      formikProps={{
        initialValues: FILTER_PANE_FORM_INITIAL_VALUES,
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
