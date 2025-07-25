import React from "react";

import { PageLoader } from "components/common";
import { formatCategoriesForSelectInput } from "components/Post/utils";
import {
  useCreateCategory,
  useFetchCategories,
} from "hooks/reactQuery/useCategoriesApi";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Textarea as FormikTextarea,
  Select as FormikSelect,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({ handleFormSubmit, initialValues, formikRef }) => {
  const { t } = useTranslation();

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useFetchCategories();

  const { mutate: createCategory } = useCreateCategory();

  const handleCreateCategory = category => {
    createCategory({ name: category });
  };

  const categoryOptions = formatCategoriesForSelectInput(categories);

  if (isCategoriesLoading) return <PageLoader />;

  return (
    <NeetoUIForm
      className="flex flex-col justify-between"
      formikProps={{
        initialValues,
        innerRef: formikRef,
        validationSchema: POST_FORM_VALIDATION_SCHEMA,
        onSubmit: handleFormSubmit,
      }}
    >
      <div className="space-y-4">
        <FormikInput
          required
          className="w-full"
          label={t("form.title")}
          name="title"
          placeholder={t("form.placeholders.title")}
        />
        <FormikSelect
          isCreateable
          isMulti
          required
          label={t("form.category")}
          name="categories"
          options={categoryOptions}
          placeholder={t("form.placeholders.category")}
          onCreateOption={handleCreateCategory}
        />
        <FormikTextarea
          required
          className="w-full"
          label={t("form.description")}
          name="description"
          placeholder={t("form.placeholders.description")}
        />
      </div>
    </NeetoUIForm>
  );
};

export default Form;
