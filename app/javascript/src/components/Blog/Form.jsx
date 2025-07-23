import React from "react";

import { formatCategoriesForSelectInput } from "components/Blog/utils";
import { PageLoader } from "components/common";
import {
  useCreateCategory,
  useFetchCategories,
} from "hooks/reactQuery/useCategoriesApi";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Textarea as FormikTextarea,
  Select as FormikSelect,
  ActionBlock,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({ handleFormSubmit, initialValues, isSubmissionLoading }) => {
  const { t } = useTranslation();

  const history = useHistory();

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
          className="max-h-40 w-full"
          label={t("form.description")}
          name="description"
          placeholder={t("form.placeholders.description")}
        />
      </div>
      <ActionBlock
        className="mt-20 flex flex-row-reverse gap-3"
        cancelButtonProps={{
          label: t("common.cancel"),
          disabled: isSubmissionLoading,
          onClick: () => history.goBack(),
        }}
        submitButtonProps={{
          label: t("common.submit"),
          disabled: isSubmissionLoading,
          loading: isSubmissionLoading,
        }}
      />
    </NeetoUIForm>
  );
};

export default Form;
