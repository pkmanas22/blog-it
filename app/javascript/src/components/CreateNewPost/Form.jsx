import { QUERY_KEYS } from "constants/query";

import React from "react";

import { PageLoader } from "components/common";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Textarea as FormikTextarea,
  Select as FormikSelect,
  ActionBlock,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import queryClient from "utils/queryClient";

import {
  NEW_POST_INITIAL_VALUES,
  NEW_POST_VALIDATION_SCHEMA,
} from "./constants";

const Form = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { isLoading: isSubmissionLoading, mutate: createPost } =
    useCreatePost();

  const { data: { categories = [] } = {}, isLoading: isCategoriesLoading } =
    useFetchCategories();

  const handleFormSubmit = data => {
    const { title, description, categories = [] } = data;

    const categoryIds = categories.map(({ value }) => value);

    createPost(
      { title, description, categoryIds, userId: 1 },
      {
        onSuccess: () => {
          history.push(routes.blogs.index);
          queryClient.invalidateQueries(QUERY_KEYS.POSTS);
        },
      }
    );
  };

  if (isCategoriesLoading) return <PageLoader />;

  const categoryOptions = categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return (
    <NeetoUIForm
      className="flex flex-col justify-between"
      formikProps={{
        initialValues: NEW_POST_INITIAL_VALUES,
        validationSchema: NEW_POST_VALIDATION_SCHEMA,
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
          isMulti
          required
          label={t("form.category")}
          name="categories"
          options={categoryOptions}
          placeholder={t("form.placeholders.category")}
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
        className="mt-20 flex flex-row-reverse"
        cancelButtonProps={{
          label: t("form.cancel"),
          disabled: isSubmissionLoading,
        }}
        submitButtonProps={{
          label: t("form.submit"),
          disabled: isSubmissionLoading,
          loading: isSubmissionLoading,
        }}
      />
    </NeetoUIForm>
  );
};

export default Form;
