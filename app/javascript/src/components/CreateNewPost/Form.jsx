import { QUERY_KEYS } from "constants/query";

import React from "react";

import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { Button } from "neetoui";
import {
  Form as NeetoUIForm,
  Input as FormikInput,
  Button as FormikButton,
  Textarea as FormikTextarea,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";
import queryClient from "utils/queryClient";

import {
  NEW_POST_INITIAL_VALUES,
  NEW_POST_VALIDATION_SCHEMA,
} from "./constants";

const Form = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { isLoading, mutate: createPost } = useCreatePost();

  const handleFormSubmit = data => {
    const { title, description } = data;

    createPost(
      { title, description },
      {
        onSuccess: () => {
          history.push(routes.blogs.index);
          queryClient.invalidateQueries(QUERY_KEYS.POSTS);
        },
      }
    );
  };

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
        <FormikTextarea
          required
          className="max-h-40 w-full"
          label={t("form.description")}
          name="description"
          placeholder={t("form.placeholders.description")}
        />
      </div>
      <div className="mt-40 flex justify-end gap-2 ">
        <Button
          className="w-20"
          disabled={isLoading}
          label={t("form.cancel")}
          style="secondary"
          type="reset"
        />
        <FormikButton
          className="w-20"
          disabled={isLoading}
          label={t("form.submit")}
          type="submit"
        />
      </div>
    </NeetoUIForm>
  );
};

export default Form;
